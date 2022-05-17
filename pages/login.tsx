import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import LoginBody from "@/components/Login/LoginBody";
import LandingLayout from "@/components/Common/LandingLayout";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login / HandCheck 🤝</title>
      </Head>
      <LandingLayout>
      <LoginBody />
      </LandingLayout>
    </>
  );
};

export default LoginPage;
