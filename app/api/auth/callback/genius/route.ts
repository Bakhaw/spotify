import { NextResponse } from "next/server";

interface QueryParams {
  client_id: string;
  //   redirect_uri: string;
  //   scope: string;
  //   state: string;
  response_type: string;
  [key: string]: string; // Index signature to allow string-based indexing
}

const authOptions: QueryParams = {
  client_id: process.env.NEXT_PUBLIC_GENIUS_CLIENT_ID ?? "",
  response_type: "code",
};

const handler = ({ query = authOptions }: { query: QueryParams }) => {
  if (!query.client_id || !query.response_type) {
    return NextResponse.json({
      error: "Missing required parameters",
    });
  }

  const queryParams = new URLSearchParams();

  for (const key in query) {
    console.log("key", key);
    console.log("query", query);
    queryParams.append(key, query[key]);
  }

  const authorizationUrl = `https://api.genius.com/oauth/authorize?${queryParams.toString()}`;

  return NextResponse.json({
    authorizationUrl,
  });
};

export { handler as GET, handler as POST };
