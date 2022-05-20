import { useEventListener } from "hooks/useEventListener";
import Script from "next/script";
import React from "react"


export default function Checkout({checkout} : any) {

    useEventListener("onCheckoutPaymentSuccess", async (e: any) => {
        if (e?.detail) {
          console.log(e?.detail)
        //  const response  =  await axios.post("/api/checkout/update", {
        //     checkout_id: checkout.id,
        //   });
        //   const orderId = response.data.orderId
        //   setOrderMsg(orderId);
        //   setIsPaymentSuccess(true);
        }
      });
    
      useEventListener("onCheckoutFailure", (e: any) => {
        if (e?.detail) {
          console.log("onCheckoutFailure", e?.detail);
        }
      });
    
      useEventListener("onCheckoutPaymentFailure", async (e: any) => {
        if (e?.detail) {
          console.log("onCheckoutFailure", e?.detail);
        //   await axios.post("/api/checkout/update", {
        //     checkout_id: checkout.id,
        //   });
        }
      });

    return (
        <>
        
        <div id="rapyd-checkout"> </div>

        {typeof window !== "undefined" && (
        <Script
          id="cdn-hehe"
          src="https://sandboxcheckouttoolkit.rapyd.net"
        //   strategy="lazyOnload"
          onLoad={() => {
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
    )
}