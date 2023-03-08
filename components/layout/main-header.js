import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

function MainHeader() {
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="p-3 bg-red-500">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between lg:grid lg:grid-cols-4 lg:grid-rows-1">
          <div className="flex col-start-2 col-span-2 justify-center font-extrabold text-3xl lg:text-5xl">
            <Link href="/">
              <span className="inline-block align-middle">PUMP SAM UP</span>
            </Link>
          </div>
          <div className="flex flex-row justify-end space-x-4 h-14">
            {!session && !loading && (
              <Link href="/auth" className="flex justify-end">
                <button className="rounded-md w-max border-2 border-black p-3 bg-white h-full">
                  Login
                </button>
              </Link>
            )}
            {session && (
              <Link href="/profile">
                <button className="rounded-md w-max border-2 border-black p-3 bg-white h-full ">
                  Profile
                </button>
              </Link>
            )}
            {session && (
              <button
                onClick={logoutHandler}
                className="rounded-md w-max border-2 border-black p-3 bg-white h-full"
              >
                Logout
              </button>
            )}
          </div>

          {/* <Link href="/">
            <div className="absolute top-4 right-4 flex items-center border-2 border-black p-3 bg-white">
              Sign In
            </div>
          </Link> */}
        </div>
        <div className="flex justify-center text-lg lg:text-2xl">
          <p>
            <span className="font-bold">LIVE</span> - Every Monday and Thursday
            at 8pm EST
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
