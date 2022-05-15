import { withSessionRoute } from "../../lib/withSession";
import * as bcrypt from "bcrypt";
import { prisma } from "@/database";

export default withSessionRoute(loginRoute);


async function loginRoute(req: any, res: any) {
    // get user from database then:
    const data = req.body;


    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
        }
    })


    if(!user) {
        return res.status(400).send({
            message: "Email not found"
        })
    }


    const isMatch = await bcrypt.compare(data.password, user.password);

    if(!isMatch) {
        return res.status(400).send({
            message: "Wrong password"
        })
    }

    req.session.user = {
        id: user.id,
    };
    await req.session.save();
    res.send({ ok: true });
}