import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Script from "next/script";
import { useEventListener } from "../../hooks/useEventListener";
import { prisma } from "@/database";
import React from "react";
import CheckoutFormBody from "@/components/Checkout/CheckoutFormBody";
import CheckoutError from "@/components/Checkout/CheckoutError";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
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
          item: true
        }
      },
      store_id:true,
      total: true,
      store: {
        select: {
          name: true,
          country: true,
          currency: true
        }
      }
    }
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
  console.log(checkout);
  const [isCheckoutError, setIsCheckoutError] = React.useState(false);
  const [isPaymentError, setIsPaymentError] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  //
  useEventListener("onCheckoutPaymentSuccess", (e: any) => {
    if (e?.detail) {
      console.log("onCheckoutPaymentSuccess", e?.detail);
      setIsPaymentSuccess(true);
    }
  });

  useEventListener("onCheckoutFailure", (e: any) => {
    if (e?.detail) {
      console.log("onCheckoutFailure", e?.detail);
      setIsCheckoutError(true);
    }
  });

  useEventListener("onCheckoutPaymentFailure", (e: any) => {
    if (e?.detail) {
      console.log("onCheckoutFailure", e?.detail);
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
      {
        isCheckoutError && <CheckoutError/>
      }
      {
        isPaymentSuccess && <CheckoutSuccess/>
      }
      {
        isPaymentError && <CheckoutError/>
      }
    </>
  );
};

export default CheckoutPage;
