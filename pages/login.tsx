import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import LoginBody from "../components/Login/LoginBody";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login / Embd</title>
      </Head>
      <LoginBody />
    </>
  );
};

export default LoginPage;
