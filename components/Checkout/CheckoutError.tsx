export default function CheckoutError({ errMsg }: any) {
  return (
    <div className="bg-gray-100 h-full">
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
            It seems like something went wrong. Please try again later.
          </p>
          {/* tailwind code  */}
          <code className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-lg">
            {errMsg}
          </code>
        </div>
      </div>
    </div>
  );
}
