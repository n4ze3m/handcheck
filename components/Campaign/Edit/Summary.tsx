import { Statistic } from "antd";
import { convertCurreny } from "lib/currency";

export default function Summary({ amount }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div>
        <div className="rounded-md shadow-md bg-white p-6">
          <Statistic
            title="Target Amount"
            value={convertCurreny(amount.targetAmount, amount.currency)}
          />
        </div>
      </div>
      <div>
        <div className="rounded-md shadow-md bg-white p-6">
          <Statistic
            title="Current collections"
            value={convertCurreny(amount.totalAmount, amount.currency)}
          />
        </div>
      </div>
      <div>
        <div className="rounded-md shadow-md bg-white p-6">
          <Statistic title="Total donations" value={amount.totalDonation} />
        </div>
      </div>
    </div>
  );
}
