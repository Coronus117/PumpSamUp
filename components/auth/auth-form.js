import { useState, useRef } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

const createUser = async (email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const loginUser = async (enteredEmail, enteredPassword) => {
  // log user in. Result will be content which might be data or it could be an error
  const result = await signIn("credentials", {
    // Do not auto redirect if we throw an error, leave on page and show an error message
    redirect: false,
    email: enteredEmail,
    password: enteredPassword,
  });
  return result;
};

function AuthForm({ inModal = false, modalCloseHandler }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const router = useRouter();

  function switchAuthModeHandler(button) {
    if ((button === "login" && !isLogin) || (button === "signup" && isLogin)) {
      setIsLogin((prevState) => !prevState);
      setErrorMessage();
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // TODO Add input validation

    if (isLogin) {
      const loginUserResult = await loginUser(enteredEmail, enteredPassword);
      if (!loginUserResult.error) {
        // login successful, redirect
        if (inModal) {
          // If we're in a modal, close the modal
          modalCloseHandler();
        }
        router.replace("/");
      } else {
        setErrorMessage("Invalid Email or Password");
      }
    } else {
      // create mode
      const createUserResult = await createUser(enteredEmail, enteredPassword);
      if (!createUserResult.error) {
        // Created user, now log in
        const loginUserResult = await loginUser(enteredEmail, enteredPassword);
        if (!loginUserResult.error) {
          // login successful, redirect
          if (inModal) {
            // If we're in a modal, close the modal
            modalCloseHandler();
          }
          router.replace("/");
        } else {
          setErrorMessage("Invalid Email or Password");
        }
      } else {
        console.log("createUserResult.error ", createUserResult.error);
        setErrorMessage(createUserResult.error);
      }
    }
  };

  return (
    <div>
      {inModal && (
        <button
          className={"float-right h-8 left-3 relative select-none top-4 w-8"}
          onClick={modalCloseHandler}
        >
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 9.00004L9 15M15 15L9 9.00004M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <section className="p-2 border-2 border-black flex flex-col space-y-4 bg-white rounded-lg w-full ">
        <h1 className="text-2xl text-center">
          {isLogin ? "Log In with existing account" : "Create new account"}
        </h1>
        <div className="w-full gap-2 grid grid-cols-2">
          <button
            onClick={() => switchAuthModeHandler("login")}
            disabled={isLogin}
            className={`disabled:pointer-events-none h-10 border-2 select-none  active:bg-white rounded-md ${
              isLogin
                ? "bg-red-500 text-white border-black"
                : "bg-white border-gray-400 text-black"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => switchAuthModeHandler("signup")}
            disabled={!isLogin}
            className={`disabled:pointer-events-none h-10 border-2 select-none  active:bg-white rounded-md ${
              !isLogin
                ? "bg-red-500 text-white border-black"
                : "bg-white border-gray-400 text-black"
            }`}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col">
          <div className="flex flex-col space-y-0">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              className="border-2 border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-0 mt-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              className="border-2 border-gray-300 rounded-lg"
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 font-medium pl-1">{errorMessage}</div>
          )}
          <div className="w-full flex justify-center items-center mt-4 flex-col">
            <button
              className={
                "disabled:pointer-events-none h-10 w-1/2 border-2 select-none  active:bg-white rounded-md bg-red-500 text-white border-black"
              }
            >
              {isLogin ? "Log In" : "Create Account"}
            </button>
            {inModal && (
              <button
                className={
                  "disabled:pointer-events-none h-10 w-1/2 select-none    text-gray-700 "
                }
                onClick={modalCloseHandler}
              >
                Close
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

export default AuthForm;
