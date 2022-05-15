import { rapydRequest } from "../../../lib/rapyd"
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
        return data["data"]["id"]
    } catch (e) {
        console.log(e)
        return null
    }
}

export default async function create(req: any, res: any) {

    const data = req.body

    const store = await prisma.store.findFirst({
        where: {
            id: data.store_id
        }
    })


    if (!store) {
        return res.status(404).send({
            error: "Store not found"
        })
    }


    const products = await prisma.items.findMany({
        where: {
            store_id: data.store_id,
            id: {
                in: data.products.map((product: any) => product.product_id)
            }
        }
    })

    if (products.length !== data.products.length) {
        return res.status(404).send({
            error: "Product not found"
        })
    }

    const total = products.reduce((total: number, product: any) => {
        const productData = data.products.find((p: any) => p.product_id === product.id)
        return total + product.price * productData.quantity
    }, 0)


    const checkoutData = {
        "amount": total,
        "country": store.country,
        "currency": store.currency,
        "cardholder_preferred_currency": true,
        "language": "en",
        "metadata": {
            "merchant_defined": true
        }
    }


    const checkout_id = await generateCheckout({
        data: checkoutData,
        accessToken: store.rapydAccessToken!,
        secretKey: store.rapydSecretToken!
    })

    if (!checkout_id) {
        return res.status(500).send({
            error: "Error creating checkout"
        })
    }


    const chk = await prisma.checkout.create({
        data: {
            rapydCheckout: checkout_id,
            total: total,
            paymentStatus: "pending",
            store_id: data.store_id,
        }
    })

    const items = data.products.map((product: any) => {
        return {
            checkout_id: chk.id,
            item_id: product.product_id,
            quantity: product.quantity
        }
    })

    await prisma.checkoutItems.createMany({
        data: items
    })

    return res.status(200).send({
        checkout: chk.id
    })
}