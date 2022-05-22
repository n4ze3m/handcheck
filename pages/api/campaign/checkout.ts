import { rapydRequest } from "lib/rapyd"
import { prisma } from "@/database";


interface ICheckout {
    data: any,
    accessToken: string,
    secretKey: string
}

async function generateCheckout(checkout: ICheckout) {
    try {
        const response = await rapydRequest({
            accessKey: checkout.accessToken,
            secretKey: checkout.secretKey,
            method: "POST",
            urlPath: "/v1/checkout",
            body: checkout.data
        })
        const data = response.data
        // console.log(data)
        return data["data"]["id"]
    } catch (e) {
        console.log(e)
        return null
    }
}

async function getPaymentMethod(checkout: ICheckout) {
    try {
        const response = await rapydRequest({
            accessKey: checkout.accessToken,
            secretKey: checkout.secretKey,
            method: "GET",
            urlPath: "/v1/payment_methods/country?country=" + checkout.data,
        })
        const data = response.data["data"]
        const method = data.filter((item: any) => item.category === "card")
        const payment_methods = method.map((item: any) => item.type)
        return payment_methods
    } catch(e){
        console.log(e)
        return []
    }
}

export default async function create(req: any, res: any) {

    const data = req.body


    if (!data.value.email) {
        res.status(400).send({
            message: "Email is required"
        })
        return
    }

    const campaign = await prisma.campaign.findFirst({
        where: {
            url: data.url
        }
    })


    if(!campaign){
        return res.status(404).send({
            error: "Campaign not found"
        })
    }

    const payment_methods = await getPaymentMethod({
        accessToken: campaign.rapydAccessToken!,
        secretKey: campaign.rapydSecretToken!,
        data: campaign.country
    })



    const checkoutData = {
        "amount": data.value.amount,
        "country": campaign.country,
        "currency": campaign.currency,
        "cardholder_preferred_currency": true,
        "language": "en",
        "metadata": {
            "merchant_defined": true
        },
        "payment_method_types_include": payment_methods,
    }

    const checkout_id = await generateCheckout({
        data: checkoutData,
        accessToken: campaign.rapydAccessToken,
        secretKey: campaign.rapydSecretToken
    })

    if (!checkout_id) {
        return res.status(500).send({
            error: "Error creating checkout"
        })
    }

    const value = data.value

    const chk = await prisma.campaignResponse.create({
        data: {
            checkout_id,
            campaign_id: campaign.id,
            ...value
        }
    })


    return res.status(200).send({
        checkout_id: chk.checkout_id,
    })
}