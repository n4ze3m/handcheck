import CheckoutError from "@/components/Checkout/CheckoutError";
import CheckoutSuccess from "@/components/Checkout/CheckoutSuccess";
import { Spin } from "antd";
import axios from "axios";
import { useEventListener } from "hooks/useEventListener";
import Script from "next/script";
import React from "react";

export default function FastCheckout({ checkout }: any) {
  const [isCheckoutError, setIsCheckoutError] = React.useState(false);
  const [isPaymentError, setIsPaymentError] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errMsg, setErrMsg] = React.useState("");
  const [orderMsg, setOrderMsg] = React.useState("");


  React.useEffect(() => {
    // wait for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  useEventListener("onCheckoutPaymentSuccess", async (e: any) => {
    if (e?.detail) {
      console.log(e?.detail);
      const response = await axios.post("/api/checkout/update", {
        checkout_id: checkout.checkout,
      });
      const orderId = response.data.orderId;
      setOrderMsg(orderId);
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
        checkout_id: checkout.checkout,
      });
      setErrMsg(e?.detail?.error || "Payment failed");
      setIsPaymentError(true);
    }
  });

  // initial checkout form
  const CheckoutForm = () => (
    <>
      <div
        className={`
      ${!isLoading ? "hidden" : ""}
      `}
      >
        {/* center of the screen */}
        <div className="flex h-screen">
          <div className="m-auto">
            <Spin size="large" />
          </div>
        </div>
      </div>
      <div
        className={`
      ${isLoading ? "hidden" : ""}
      `}
      >
        <div id="rapyd-checkout"> </div>
      </div>

      {typeof window !== "undefined" && (
        <Script
          id={`ID-${new Date().getTime()}`}
          src="https://sandboxcheckouttoolkit.rapyd.net"
          //   strategy="lazyOnload"
          onLoad={() => {
            let c = new window.RapydCheckoutToolkit({
              pay_button_text: "Pay Now",
              pay_button_color: "#4BB4D2",
              id: checkout.checkout_id,
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

  return (
    <>
      {!isCheckoutError && !isPaymentSuccess && !isPaymentError && (
        <CheckoutForm />
      )}
      {isCheckoutError && <CheckoutError errMsg={errMsg} />}
      {isPaymentSuccess && <CheckoutSuccess orderId={orderMsg} />}
      {isPaymentError && <CheckoutError errMsg={errMsg} />}
    </>
  );
}
