import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body);
  console.log(req.session);
  const { token } = req.body;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      ok: false,
      error: "No token provided",
    });
  }
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: {
      user: true,
    },
  });
  if (!foundToken) {
    return res.status(400).json({
      ok: false,
      error: "Token not found",
    });
  }
  console.log(foundToken);
  req.session.user = {
    id: foundToken.user.id,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.user.id,
    },
  });
  res.status(200).json({
    ok: true,
  });
}

export default withApiSession(withHandler("POST", handler));
