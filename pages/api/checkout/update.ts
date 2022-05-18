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
        return data["data"]["status"]
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

    const checkout = await prisma.checkout.findFirst({
        where: {
            id: data.checkout_id
        },
        include: {
            store: true
        }
    })

    if (!checkout) {
        return res.status(404).send({
            error: "Checkout not found"
        })
    }

    const paymentStatus = await checkCheckout({
        checkout_id: checkout.rapydCheckout,
        accessToken: checkout.store.rapydAccessToken!,
        secretKey: checkout.store.rapydSecretToken!
    })

    console.log(paymentStatus)

    if (!paymentStatus) {
        return res.status(500).send({
            error: "Error checking payment status"
        })
    }

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


    const orderId = nanoid()

    await prisma.checkout.update({
        where: {
            id: checkout.id
        },
        data: {
            paymentStatus: status,
            completed: true,
            orderId
        }
    })

    const isEmailCheckout = await prisma.emailCheckout.findFirst({
        where: {
            checkout_id: checkout.id
        }
    })

    if (isEmailCheckout) {
        await prisma.emailCheckout.update({
            where: {
                id: isEmailCheckout.id
            },
            data: {
                status: status === "PAID" ? "SUCCESS" : "UNSUCCESS"
            }
        })
    }

    return res.status(200).send({
        status: status,
        orderId: orderId
    })

}