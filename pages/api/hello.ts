// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { rapydRequest } from '../../lib/rapyd'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await rapydRequest({
      accessKey: process.env.RAPYD_ACCESS_KEY!,
      secretKey: process.env.RAPYD_SECRET_KEY!,
      method: "POST",
      urlPath: "/v1/checkout",
      body: {
        "amount": 123.45,
        "complete_payment_url": "http://example.com/complete",
        "country": "IN",
        "currency": "INR",
        "requested_currency": "USD",
        "error_payment_url": "http://example.com/error",
        "cardholder_preferred_currency": true,
        "language": "en",
    }
    })
    res.status(200).json(response.data)
  } catch (e: any) {
    console.log(e?.response?.data)
    res.status(500).send(e)
  }
}
