import Script from "next/script";

export default function CheckoutFormBody({ checkout }: any) {
  return (
    <>
    <div></div>
      <div className="grid justify-center w-full min-h-screen grid-cols-1 gap-0 m-0 sm:grid-cols-6">
        <div className="col-span-6 sm:col-span-3 w-full">
          <div id="rapyd-checkout"> </div>
        </div>
        <div className="col-span-6 bg-gray-100 sm:col-span-3 p-6 w-full">
          {/* order summary in tailwind */}
          <h1 className="text-2xl font-bold text-gray-800">
            Order Summary
          </h1>
        <div className="mt-3">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {checkout.checkoutItems.map((product: any) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.item.image}
                    alt={product.item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.item.name}</h3>
                      <p className="ml-4">
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: checkout.store.currency,
                        }).format(product.item.price * product.quantity)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
