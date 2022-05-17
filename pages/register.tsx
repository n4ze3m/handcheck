import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import RegisterBody from "@/components/Register/RegisterBody";
import LandingLayout from "@/components/Common/LandingLayout";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register / HandCheck 🤝</title>
      </Head>
      <LandingLayout>
        <RegisterBody />
      </LandingLayout>
    </>
  );
};

export default RegisterPage;
