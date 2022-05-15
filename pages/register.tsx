import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import RegisterBody from "@/components/Register/RegisterBody";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register / Embd</title>
      </Head>
      <RegisterBody />
    </>
  );
};

export default RegisterPage;
