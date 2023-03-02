import React, { useRef } from "react";
import { getSession } from "next-auth/client";

import ChangePassword from "@/components/auth/change-password-form";

const Profile = () => {
  return (
    <div className="flex justify-center mt-4">
      <ChangePassword />
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
