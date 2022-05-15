import Script from "next/script";

export default function CheckoutFormBody({ checkout }: any) {
  return (
    <>
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
}
