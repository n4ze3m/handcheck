import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useEventListener } from "../../hooks/useEventListener";
import { prisma } from "@/database";
import React from "react";
import CheckoutFormBody from "@/components/Checkout/CheckoutFormBody";
import CheckoutError from "@/components/Checkout/CheckoutError";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
import axios from "axios";
declare global {
  interface Window {
    RapydCheckoutToolkit: any;
  }
  interface HTMLElementEventMap {
    onCheckoutPaymentSuccess: Event;
    onCheckoutFailure: Event;
    onCheckoutPaymentFailure: Event;
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id as string;

  const checkout = await prisma.checkout.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      rapydCheckout: true,
      paymentStatus: true,
      checkoutItems: {
        include: {
          item: true,
        },
      },
      store_id: true,
      total: true,
      store: {
        select: {
          name: true,
          country: true,
          currency: true,
        },
      },
    },
    // include: {
    //   checkoutItems: {
    //     include: {
    //       item: true,
    //     },
    //   },
    // },
  });

  if (!checkout) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      checkout: JSON.parse(JSON.stringify(checkout)),
    },
  };
};

const CheckoutPage: NextPage = ({ checkout }: any) => {
  const [isCheckoutError, setIsCheckoutError] = React.useState(false);
  const [isPaymentError, setIsPaymentError] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  useEventListener("onCheckoutPaymentSuccess", async (e: any) => {
    if (e?.detail) {
      console.log(e?.detail)
      await axios.post("/api/checkout/update", {
        checkout_id: checkout.id,
      });
      setIsPaymentSuccess(true);
    }
  });

  useEventListener("onCheckoutFailure", (e: any) => {
    if (e?.detail) {
      console.log("onCheckoutFailure", e?.detail);
      setErrMsg(e?.detail?.error);
      setIsCheckoutError(true);
    }
  });

  useEventListener("onCheckoutPaymentFailure", async (e: any) => {
    if (e?.detail) {
      console.log("onCheckoutFailure", e?.detail);
      await axios.post("/api/checkout/update", {
        checkout_id: checkout.id,
      });
      setErrMsg(e?.detail?.error || "Payment failed");
      setIsPaymentError(true);
    }
  });


  return (
    <>
      <Head>
        <title>Checkout / Embd</title>
      </Head>
      {!isCheckoutError && !isPaymentSuccess && !isPaymentError && (
        <CheckoutFormBody checkout={checkout} />
      )}
      {isCheckoutError && <CheckoutError errMsg={errMsg} />}
      {isPaymentSuccess && <CheckoutSuccess />}
      {isPaymentError && <CheckoutError errMsg={errMsg} />}
    </>
  );
};

export default CheckoutPage;
