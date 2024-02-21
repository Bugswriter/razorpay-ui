/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import { useState } from "react";

export default function UserPayment() {
  interface PaymentResponse {
    amount: number;
    customer: {
      contact: string;
      email: string;
      name: string;
    };
    short_url: string;
  }

  const [paymentId, setPaymentId] = useState("");
  const [responseData, setResponseData] = useState<PaymentResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentId(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        `http://34.100.224.235/payment/${paymentId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // Add type annotation for data variable
      const data: PaymentResponse = await response.json();
      setResponseData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Payment</title>
        <meta name="description" content="Dashboard Page Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center py-12">
        <div>
          <label className="form-control w-72 max-w-xs">
            <div className="label">
              <span className="label-text text-lg">Enter your payment ID:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-72"
              placeholder="Payent id..."
              value={paymentId}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="py-6">
          <button
            className="btn btn-primary text-lg"
            disabled={!paymentId.trim().length}
            onClick={handleButtonClick}
          >
            Submit
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {responseData && (
          <div className="card w-96 rounded-md border border-gray-300 bg-base-100">
            <div className="card-body">
              <h2 className="card-title">
                {responseData.customer.name}&apos;s Order
              </h2>
              <div>
                <p>Contact: {responseData.customer?.contact}</p>
                <p>Email: {responseData.customer?.email}</p>
                <p>Amount: {responseData.amount}</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleButtonClick}>
                  <a
                    href={responseData.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pay Now
                  </a>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
