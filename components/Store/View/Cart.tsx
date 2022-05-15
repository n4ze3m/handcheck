import { Empty } from "antd";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";

export default function Cart({ state }: any) {
  const [products, setProducts] = React.useState([]);
  const [total, setTotal] = React.useState("0");
  const router = useRouter();
  // this is a bad practice anyway :/
  React.useEffect(() => {
    fetchProductFromLocalStorage();
  }, [state]);

  const fetchProductFromLocalStorage = () => {
    const cart = localStorage.getItem("products-" + router.query.id);
    if (cart) {
      const prds = JSON.parse(cart);
      setProducts(prds);
      if (prds.length > 0) {
        const totalPrice = prds.reduce((acc: any, cur: any) => {
          return acc + cur.price * cur.quantity;
        }, 0);
        setTotal(
          new Intl.NumberFormat("en", {
            style: "currency",
            currency: prds[0].currency,
          }).format(totalPrice)
        );
      } else {
        setTotal("0");
      }
    } else {
      setProducts([]);
      setTotal("0");
    }
  };

  const removeProduct = (id: any) => {
    const newProducts = products.filter((product: any) => product.id !== id);
    localStorage.setItem(
      "products-" + router.query.id,
      JSON.stringify(newProducts)
    );
    fetchProductFromLocalStorage();
  };

  const createCheckout = async () => {
    try {
      // get store id
      const store_id = router.query.id;
      // get product id, quantity
      const checkoutProduct = products.map((product: any) => {
        return {
          product_id: product.id,
          quantity: product.quantity,
        };
      });

      const data = {
        store_id,
        products: checkoutProduct,
      };

      const response = await axios.post("/api/checkout/create", data);
      const id = response.data.checkout;
      router.push("/checkout/" + id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mt-3">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {products.length === 0 && (
              <Empty description="No products in cart" />
            )}
            {products.map((product: any) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name}</h3>
                      <p className="ml-4">
                        {new Intl.NumberFormat("en", {
                          style: "currency",
                          currency: product.currency,
                        }).format(product.price * product.quantity)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeProduct(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {products.length > 0 && (
        <div className="mt-3 border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{total}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <button
              onClick={createCheckout}
              className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
