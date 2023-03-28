import React, { useRef } from "react";
import { getSession } from "next-auth/client";
import Spinner from "../ui/Spinner";

const ChangePassword = ({ onChangePassword, loading }) => {
  const newPasswordInputRef = useRef();
  const oldPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredOldPassword = oldPasswordInputRef.current.value;

    // TODO: Add validation

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <section className="p-2 border-2 border-black flex flex-col space-y-4 bg-white rounded-lg w-full lg:w-1/3">
      <h1 className="text-2xl text-center">Change Password</h1>
      <form onSubmit={submitHandler} className="flex flex-col">
        <div className="flex flex-col space-y-0">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            required
            ref={newPasswordInputRef}
            className="border-2 border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col space-y-0 mt-2">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            required
            ref={oldPasswordInputRef}
            className="border-2 border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full flex justify-center mt-4 mb-2">
          <button
            disabled={loading}
            className={
              "disabled:pointer-events-none h-10 w-1/2 border-2 flex justify-center items-center select-none hover:border-black hover:bg-gray-400 active:bg-white rounded-md bg-red-500 text-white border-black"
            }
          >
            {loading ? <Spinner /> : "Change Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePassword;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        // Not everytime, only this time if not authenticated/logged in
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
