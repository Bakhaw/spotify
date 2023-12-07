import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

import Logout from "@/components/Logout";
import Cover from "@/components/Cover";

const Account: NextPage = () => {
  const { data } = useSession();

  if (!data) return null;

  return (
    <div className="flex justify-between">
      <NextSeo title="music app - profile" description="music app - profile" />

      <div className="flex flex-col grow items-center gap-4">
        <Cover
          alt={data.user?.name ?? "avatar"}
          rounded
          size="small"
          src={data.user?.image}
        />
        <h1 className="text-3xl">{data.user?.name}</h1>
      </div>

      <div className="p-4">
        <Logout />
      </div>
    </div>
  );
};

export default Account;
