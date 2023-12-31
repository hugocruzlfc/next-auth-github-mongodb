// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  console.log(session);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  res.status(200).json({ name: "John Doe" });
}
