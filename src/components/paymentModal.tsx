/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, type FormEvent } from "react";

export default function PaymentModal() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const apiUrl = `http://34.100.224.235/payment/?amount=${encodeURIComponent(amount)}&currency=${encodeURIComponent(currency)}&description=${encodeURIComponent(remark)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&contact=${encodeURIComponent(contact)}&sms_notification=false&email_notification=false&reminder_enable=false`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic YWRtaW46dGVzdEAxMjM=",
      },
      body: JSON.stringify({
        name,
        amount,
        currency,
        email,
        contact,
        remark,
      }),
    });

    if (response.ok) {
      (document.getElementById("my_modal_3") as HTMLDialogElement)?.close();
    } else {
      // handle error
    }
  };

  return (
    <>
      <div className="mb-6 py-8">
        <button
          className="btn btn-primary btn-xs text-lg sm:btn-sm md:btn-md lg:btn-lg"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3",
            ) as HTMLDialogElement | null;
            if (modal) {
              modal.showModal();
            }
          }}
        >
          Create Payment Link
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="mb-5 text-2xl font-bold">Create a payment link</h3>
          <div className="py-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Amount</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Currency </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Email</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Contact</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-lg">Remark</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
            </label>
          </div>

          <form
            method="dialog"
            onSubmit={handleSubmit}
            className="modal-action"
          >
            <button className="btn text-lg">Submit</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
