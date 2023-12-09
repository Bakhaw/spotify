import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import Cover from "@/components/Cover";

async function Account() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-between">
      {session?.user?.name ? (
        <div className="flex flex-col grow items-center gap-4">
          <Cover
            alt={session.user?.name ?? "avatar"}
            rounded
            size="small"
            src={session.user?.image}
          />
          <h1 className="text-3xl">{session.user?.name}</h1>
        </div>
      ) : (
        <div>no session</div>
      )}
    </div>
  );
}

export default Account;
