"use client";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import Cover from "@/components/Cover";

const Account: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex justify-between">
      <div className="flex flex-col grow items-center gap-4">
        <Cover
          alt={session.user?.name ?? "avatar"}
          rounded
          size="small"
          src={session.user?.image}
        />
        <h1 className="text-3xl">{session.user?.name}</h1>
      </div>
    </div>
  );
};

export default Account;
