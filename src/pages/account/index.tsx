import { NextPage } from "next";
import { useSession } from "next-auth/react";

import SignOut from "@/components/SignOut";
import Cover from "@/components/Cover";

const Account: NextPage = () => {
  const { data } = useSession();

  if (!data) return null;

  return (
    <div className="flex justify-between">
      <div className="flex flex-col grow items-center gap-4">
        <Cover
          alt={data.user?.name ?? "avatar"}
          rounded
          size="large"
          src={data.user?.image}
        />
        <h1 className="text-3xl">{data.user?.name}</h1>
      </div>

      <div className="p-4">
        <SignOut />
      </div>
    </div>
  );
};

export default Account;
