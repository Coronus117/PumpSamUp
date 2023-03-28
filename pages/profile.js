import React, { useRef, useState } from "react";
import { getSession } from "next-auth/client";

import ChangePassword from "@/components/auth/change-password-form";

const Profile = ({ session }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);

  async function changePasswordHandler(passwordData) {
    setErrorMessage();
    setSuccessMessage();
    setLoading(true);

    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    setLoading(false);
    setErrorMessage(data.error);
    setSuccessMessage(data.message);
  }

  return (
    <div className="flex flex-col justify-center px-4 py-4 lg:px-0 space-y-4 items-center">
      <div className="text-2xl">Welcome, {session.user.email}</div>
      <div className="pl-2 text-xl">
        Member Benefits:
        <ul className="list-disc pl-6">
          <li>Vote on exercises!</li>
          <li>Earn 10 free votes every day!</li>
        </ul>
      </div>
      <ChangePassword
        onChangePassword={changePasswordHandler}
        loading={loading}
      />
      {errorMessage && (
        <div className="text-red-500 font-medium pl-1">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-500 font-medium pl-1">{successMessage}</div>
      )}
    </div>
  );
};

export default Profile;

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
