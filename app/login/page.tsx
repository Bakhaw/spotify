import { ClientSafeProvider, signIn } from "next-auth/react";

import useProviders from "@/hooks/useProviders";

const Login = () => {
  const providers = useProviders();

  function handleLoginButtonClick(provider: ClientSafeProvider) {
    signIn(provider.id, {
      callbackUrl: "/",
    });
  }

  if (!providers) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="text-black bg-green-primary hover:bg-green-primary/90 transition-all w-72 h-12 rounded-3xl"
            onClick={() => handleLoginButtonClick(provider)}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;
