import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  if (!profile) {
    return res.status(400).json({
      ok: false,
      error: "Profile not found",
    });
  }
  return res.status(200).json({
    ok: true,
    profile,
  });
}

export default withApiSession(
  withHandler({ method: "GET", handler, isPrivate: true })
);
