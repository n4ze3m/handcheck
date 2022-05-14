import { withSessionRoute } from "../../../../lib/withSession";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default withSessionRoute(createProduct);


async function createProduct(req: any, res: any) {
    const user = req.session.user

    if (!user) {
        return res.status(400).send({
            message: "User not found"
        })
    }

    const data = req.body

    const isValidStore = await prisma.store.findFirst({
        where: {
            user_id: user.id,
            id: data.store_id
        }
    })

    if (!isValidStore) {
        return res.status(400).send({
            message: "Store not found"
        })
    }

    await prisma.items.create({
        data: {
            name: data.name,
            image: data.image,
            price: data.price,
            store_id: data.store_id
        }
    })

    return res.status(200).send({
        message: "Product created"
    })
}