import { withSessionRoute } from "lib/withSession";
import { prisma } from "@/database";
import { rapydRequest } from "lib/rapyd";
import slugify from "slugify";


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
    try {
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
    const timestamp = new Date().getTime()
    const slug = slugify(`${data.name} ${timestamp}`, {
        lower: true,
        trim: true,
    })

    const campaign = await prisma.campaign.create({
        data: {
            url: slug,
            country: data.country,
            currency: data.currency,
            name: data.name,
            user_id: user.id,
            rapydAccessToken: data.rapydAccessToken,
            rapydSecretToken: data.rapydSecretToken,
            description: data.description,
            targetAmount: data.targetAmount,
        }
    })

    return res.status(200).send({
        message: "Store created successfully",
        campaign: campaign.id,
    })
    } catch(e:any) {
        console.log(e)
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}