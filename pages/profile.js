import React from "react";
import { getSession } from "next-auth/client";

const Profile = () => {
  return <div>THIS IS YOUR PROFILE PAGE</div>;
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
