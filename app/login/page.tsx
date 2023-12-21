"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

import useProviders from "@/hooks/useProviders";
import { useRouter } from "next/navigation";

const Login = () => {
  const providers = useProviders();
  const router = useRouter();

  function handleLoginButtonClick(provider: ClientSafeProvider) {
    signIn(provider.id);
    router.replace("/");
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
