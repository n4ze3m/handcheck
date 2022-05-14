import axios from "axios"
import crypto from "crypto"

interface IRequest {
    method: string
    urlPath: string
    accessKey: string
    secretKey: string
    body?: any
}

interface ISign {
    method: string
    urlPath: string
    salt: string
    timestamp: number
    body?: any
    accessKey: string
    secretKey: string
}


export function rapydRequest(request: IRequest) {
    try {
        let httpMethod = request.method.toLowerCase()
        let httpBaseUrl = process.env.NEXT_RAPYD_API!
        let httpUrlPath = request.urlPath
        let salt = generateRandomString()
        let idempotency = new Date().getTime().toString();
        let timestamp = Math.round(new Date().getTime() / 1000);

        let signature = sing({ method: httpMethod, urlPath: httpUrlPath, salt: salt, timestamp: timestamp, body: request?.body, accessKey: request.accessKey, secretKey: request.secretKey })


        return axios.request({
            url: `https://${httpBaseUrl}${httpUrlPath}`,
            method: httpMethod,
            data: request.body,
            headers: {
                'Content-Type': 'application/json',
                salt: salt,
                timestamp: timestamp,
                signature: signature,
                access_key: request.accessKey,
                idempotency: idempotency
            },
        })
    } catch (e:any) {
        console.log(e?.response?.data)
        throw e
    }
}


function sing({ method, urlPath, salt, timestamp, body, accessKey, secretKey }: ISign) {
    if (!body) {
        body = ""
    } else {
        body = JSON.stringify(body)
        body = body === "{}" ? "" : body
    }
    let toSign = method + urlPath + salt + timestamp + accessKey + secretKey + body
    let hash = crypto.createHmac('sha256', secretKey);
    hash.update(toSign);
    const signature = Buffer.from(hash.digest("hex")).toString("base64")
    return signature
}


export function generateRandomString(size: number = 8): string {
    return crypto.randomBytes(size).toString("hex")
}


