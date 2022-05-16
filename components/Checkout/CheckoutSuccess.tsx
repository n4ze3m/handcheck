export default function CheckoutSuccess() {
  return (
    <div className="bg-gray-100 h-full">
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
          <p className="text-gray-600 my-2">
            Thank you for your order. We will contact you shortly.
          </p>
          <p> Have a great day! </p>
        </div>
      </div>
    </div>
  );
}
