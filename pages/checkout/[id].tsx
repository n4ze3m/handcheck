import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import Script from "next/script";
import { useEventListener } from "@mantine/hooks";
const prisma = new PrismaClient({});

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
    include: {
      checkoutItems: {
        include: {
          item: true,
        },
      },
    },
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
  //
  useEventListener("onCheckoutPaymentSuccess", (e: any) => {
    console.log("onCheckoutPaymentSuccess", e);
  });

  useEventListener("onCheckoutFailure", (e: any) => {
    console.log("onCheckoutFailure", e);
  });

  useEventListener("onCheckoutPaymentFailure", (e: any) => {
    console.log("onCheckoutPaymentFailure", e);
  });
  return (
    <>
      <Head>
        <title>Checkout / Embd</title>
      </Head>
      <div className="grid justify-center w-full min-h-screen grid-cols-1 gap-0 m-0 sm:grid-cols-6">
        <div className="col-span-6 bg-primary sm:col-span-3"></div>
        <div className="col-span-6 p-10 sm:col-span-3">
          <div id="rapyd-checkout"> </div>
        </div>
      </div>
      {typeof window !== "undefined" && (
        <Script
          id="cdn"
          src="https://sandboxcheckouttoolkit.rapyd.net"
          strategy="lazyOnload"
          onLoad={() => {
            let c = new window.RapydCheckoutToolkit({
              pay_button_text: "Pay Now",
              pay_button_color: "#4BB4D2",
              id: checkout.rapydCheckout,
              style: {
                submit: {
                  base: {
                    color: "white",
                  },
                },
              },
            });
            c.displayCheckout();
          }}
        ></Script>
      )}
    </>
  );
};

export default CheckoutPage;
