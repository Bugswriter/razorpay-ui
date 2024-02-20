import React, { useEffect, useState } from "react";

export default function TableComp() {
  interface PaymentLink {
    amount: number;
    amount_paid: number;
    customer: {
      contact: string;
      email: string;
      name: string;
    };
    short_url: string;
  }

  interface Data {
    payment_links: PaymentLink[];
  }
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    // Replace this with your actual fetch call
    fetch("http://34.100.224.235/payment/", {
      headers: {
        Accept: "application/json",
        Authorization: "Basic YWRtaW46dGVzdEAxMjM=",
      },
    })
      .then((response) => response.json())
      .then((data: Data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overflow-x-auto pb-8">
      <table className="table table-pin-rows table-pin-cols table-lg border border-gray-300">
        {/* head */}
        <thead className="text-lg">
          <tr>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Email</th>
            <th className="border border-gray-300">Phone</th>
            <th className="border border-gray-300">Amount</th>
            <th className="border border-gray-300">Amount Paid</th>
            <th className="border border-gray-300">Payment Link</th>
          </tr>
        </thead>
        <tbody>
          {data.payment_links.map((link, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{link.customer.name}</td>
              <td className="border border-gray-300">{link.customer.email}</td>
              <td className="border border-gray-300">
                {link.customer.contact}
              </td>
              <td className="border border-gray-300 text-center">
                {link.amount}
              </td>
              <td className="border border-gray-300 text-center">
                {link.amount_paid}
              </td>
              <td className="border border-gray-300 text-center text-green-500">
                <a
                  href={link.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
