import nodemailer from 'nodemailer';


import template from './template';

export const sendEmail = async (email: string, id: string, store: string) => {
    const config = {
        host: process.env.SMTP_HOST!,
        port: parseInt(process.env.SMTP_PORT!),
        auth: {
            user: process.env.SMTP_USER!,
            pass: process.env.SMTP_PASSWORD!,
        },
    }

    const url = process.env.BASE_CHECKOUT_URL! + id;

    const html = template.replace('{{url}}', url).replace('{{company_name}}', store)
    const transporter = nodemailer.createTransport(config);
    const mailOptions = {
        from: process.env.SMTP_SENDER!,
        to: [email],
        subject: 'We have placed your order!',
        html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}