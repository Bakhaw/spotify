import { NextPage } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

interface LoginProps {
  providers: Provider[];
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  function handleLoginButtonClick(provider: Provider) {
    signIn(provider.id, { callbackUrl: "/" });
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Head>
        <title>music app - login</title>
      </Head>

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#3D3ABC] hover:bg-[#2f2e60] transition-all w-72 h-12 rounded-3xl"
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

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
