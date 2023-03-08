import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  return (
    <div className="flex justify-center mt-4">
      <div className="lg:w-1/3">
        <AuthForm />
      </div>
    </div>
  );
}

export default AuthPage;
