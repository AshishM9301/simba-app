import React, { useState } from "react";

const RegisterStaff = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <Modal setShowModal={() => setShowModal(!showModal)} />
      ) : null}
    </>
  );
};

const Modal = ({ setShowModal }) => {
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <button
              className="bg-transparent border-0 text-black flex justify-end"
              onClick={() => setShowModal(false)}
            >
              <span className="text-black flex justify-center items-center opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                x
              </span>
            </button>
            <div className="relative p-6 flex-auto">
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <div className="flex w-full">
                  <span>
                    <label className="block text-black text-sm font-bold mb-1">
                      First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </span>
                  <span className="ml-4">
                    <label className="block text-black text-sm font-bold mb-1">
                      Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  </span>
                </div>
                <div className="mt-4">
                  <label className="block text-black text-sm font-bold mb-1">
                    Email
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                </div>

                <div className="mt-4">
                  <label className="block text-black text-sm font-bold mb-1">
                    Role
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end p-2 border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterStaff;
