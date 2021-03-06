// lib/withSession.ts

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextApiHandler,
} from "next";

export const sessionOptions = {
    cookieName: "embd_token",
    password: process.env.PASSWORD!,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
    };
  }
}

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
    P extends { [key: string]: unknown } = { [key: string]: unknown },
    >(
        handler: (
            context: GetServerSidePropsContext,
        ) => GetServerSidePropsResult<any> | Promise<GetServerSidePropsResult<any>>,
) {
    return withIronSessionSsr(handler, sessionOptions);
}