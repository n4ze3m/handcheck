import { rapydRequest } from "../../../lib/rapyd"
import { prisma } from "@/database";
import { nanoid } from 'nanoid'

interface ICheckoutCheck {
    checkout_id: string,
    accessToken: string,
    secretKey: string
}

async function checkCheckout(checkoutCheck: ICheckoutCheck) {
    try {
        const response = await rapydRequest({
            accessKey: checkoutCheck.accessToken,
            secretKey: checkoutCheck.secretKey,
            method: "GET",
            urlPath: `/v1/checkout/${checkoutCheck.checkout_id}`
        })
        const data = response.data
        // console.log(data)
        return {
            status: data["data"]["status"],
            payment_id: data["data"]["payment"]["id"],
        }
    } catch (e) {
        console.log(e)
        return null
    }
}


function paymentStatusText(status: string) {
    switch (status) {
        case "CLO":
            return "PAID"
        case "ERR":
            return "ERROR"
        case "EXP":
            return "EXPIRED"
        case "CAN":
            return "CANCELLED"
        default:
            return "PENDING"
    }
}


export default async function update(req: any, res: any) {
    const data = req.body

    if (!data.checkout_id) {
        return res.status(400).send({
            error: "Checkout ID is required"
        })
    }

    const campaignResponse = await prisma.campaignResponse.findFirst({
        where: {
            checkout_id: data.checkout_id
        },
        include: {
            campaign: true
        }
    })

    if (!campaignResponse) {
        return res.status(404).send({
            error: "Checkout not found"
        })
    }

    const rapydRes = await checkCheckout({
        checkout_id: data.checkout_id,
        accessToken: campaignResponse.campaign.rapydAccessToken!,
        secretKey: campaignResponse.campaign.rapydSecretToken!
    })

    console.log(rapydRes)

    if (!rapydRes) {
        return res.status(500).send({
            error: "Error checking payment status"
        })
    }

    const paymentStatus = rapydRes.status

    if (paymentStatus.toLowerCase() === "act") {
        return res.status(200).send({
            status: "waiting"
        })
    }

    if (paymentStatus.toLowerCase() === "new") {
        return res.status(400).send({
            error: "Payment Not closed"
        })
    }

    const status = paymentStatusText(paymentStatus)



    await prisma.campaignResponse.update({
        where: {
            id: campaignResponse.id
        },
        data: {
            paymentStatus: status,
            isPaid: true,
            paymend_id: rapydRes.payment_id
        }
    })


    return res.status(200).send({
        status: status,
    })

}