import { withSessionRoute } from "../../../lib/withSession";
import { PrismaClient } from "@prisma/client";
import { rapydRequest } from "../../../lib/rapyd";
const prisma = new PrismaClient();
export default withSessionRoute(createNewStore);



async function validateRapyd(accessToken: string, secretKey: string) {
    try {
        await rapydRequest({
            accessKey: accessToken,
            secretKey: secretKey,
            method: "GET",
            urlPath: "/v1/data/countries",
        })
        return true
    } catch (e) {
        return false
    }
}


async function createNewStore(req: any, res: any) {
    const user = req.session.user
    if (!user) {
        return res.status(400).send({
            message: "User not found"
        })
    }

    const data = req.body;


    // we need to verify rapyd access key and secret key 
    const isValidRapydKeys = await validateRapyd(data.rapydAccessToken, data.rapydSecretToken)

    if (!isValidRapydKeys) {
        return res.status(400).send({
            message: "Invalid rapyd keys"
        })
    }

    const store = await prisma.store.create({
        data: {
            country: data.country,
            currency: data.currency,
            name: data.name,
            user_id: user.id,
            rapydAccessToken: data.rapydAccessToken,
            rapydSecretToken: data.rapydSecretToken,
        }
    })

    return res.status(200).send({
        message: "Store created successfully",
        store: store.id,
    })
}