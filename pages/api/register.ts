import * as bcrypt from "bcrypt";
import { prisma } from "@/database";
import { withSessionRoute } from "../../lib/withSession";

export default withSessionRoute(registerRoute);

async function registerRoute(req: any, res: any) {
    // get user from database then:
    const data = req.body;
    const hashpassword = await bcrypt.hash(data.password, 12);

    const isEmailExist = await prisma.user.findFirst({
        where: {
            email: data.email,
        }
    })

    if (isEmailExist) {
        return res.status(400).send({
            message: "Email already exist"
        })
    }

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashpassword,
            name: data.name,
        }
    });


    req.session.user = {
        id: user.id,
    };
    await req.session.save();
    res.send({ ok: true });
}