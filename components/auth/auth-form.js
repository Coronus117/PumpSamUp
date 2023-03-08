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

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler(button) {
    if ((button === "login" && !isLogin) || (button === "signup" && isLogin)) {
      setIsLogin((prevState) => !prevState);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // TODO Add input validation

    if (isLogin) {
      // log user in. Result will be content which might be data or it could be an error
      const result = await signIn("credentials", {
        // Do not auto redirect if we throw an error, leave on page and show an error message
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // login successful, redirect
        router.replace("/profile");
      }
    } else {
      // create mode
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log("result ", result);
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  return (
    <section className="p-2 border-2 border-black flex flex-col space-y-4 bg-white rounded-lg w-full ">
      <h1 className="text-2xl text-center">
        {isLogin ? "Login with existing account" : "Create new account"}
      </h1>
      <div className="w-full gap-2 grid grid-cols-2">
        <button
          onClick={() => switchAuthModeHandler("login")}
          disabled={isLogin}
          className={`disabled:pointer-events-none h-10 border-2 select-none hover:border-black hover:bg-gray-400 active:bg-white rounded-md ${
            isLogin
              ? "bg-red-500 text-white border-black"
              : "bg-white border-gray-400 text-black"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => switchAuthModeHandler("signup")}
          disabled={!isLogin}
          className={`disabled:pointer-events-none h-10 border-2 select-none hover:border-black hover:bg-gray-400 active:bg-white rounded-md ${
            !isLogin
              ? "bg-red-500 text-white border-black"
              : "bg-white border-gray-400 text-black"
          }`}
        >
          Signup
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
        <div className="w-full flex justify-center mt-4 mb-2">
          <button
            className={
              "disabled:pointer-events-none h-10 w-1/2 border-2 select-none hover:border-black hover:bg-gray-400 active:bg-white rounded-md bg-red-500 text-white border-black"
            }
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
