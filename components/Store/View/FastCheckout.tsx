import { Spin } from "antd";
import axios from "axios";
import { useEventListener } from "hooks/useEventListener";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";

export default function FastCheckout({ checkout }: any) {
  const [isCheckoutError, setIsCheckoutError] = React.useState(false);
  const [isPaymentError, setIsPaymentError] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter()

  React.useEffect(() => {
    // wait for 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  useEventListener("onCheckoutPaymentSuccess", async (e: any) => {
    if (e?.detail) {
      setIsPaymentSuccess(true);
      console.log(e?.detail);
      await axios.post("/api/campaign/update", {
        checkout_id: checkout.checkout_id,
      });
      router.replace(router.asPath);

    }
  });

  useEventListener("onCheckoutFailure", async (e: any) => {
    if (e?.detail) {
      setIsCheckoutError(true);
      console.log("onCheckoutFailure", e?.detail);
      await axios.post("/api/campaign/update", {
        checkout_id: checkout.checkout_id,
      });
      router.replace(router.asPath);

    }
  });

  useEventListener("onCheckoutPaymentFailure", async (e: any) => {
    if (e?.detail) {
      setIsPaymentError(true);
      console.log("onCheckoutFailure", e?.detail);
      await axios.post("/api/campaign/update", {
        checkout_id: checkout.checkout_id,
      });
      router.replace(router.asPath);

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
            console.log("hmm");
            let c = new window.RapydCheckoutToolkit({
              pay_button_text: "Donate Now",
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
  // error screen
  const CheckoutError = ({ message }: any) => (
    <div className=" h-full">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-600 w-16 h-16 mx-auto my-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Oh no!
          </h3>
          <p className="text-gray-600 my-2">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
  // success screen
  const CheckoutPaid = () => (
    <div className="h-full">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-600 w-16 h-16 mx-auto my-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">Thank you for your donation.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!isCheckoutError && !isPaymentSuccess && !isPaymentError && (
        <CheckoutForm />
      )}
      {isCheckoutError && (
        <CheckoutError message="It seems like something went wrong. Please try again later" />
      )}
      {isPaymentSuccess && <CheckoutPaid />}
      {isPaymentError && (
        <CheckoutError
          message="
      Oh! you have paymeny error. Please try again later"
        />
      )}
    </>
  );
}
