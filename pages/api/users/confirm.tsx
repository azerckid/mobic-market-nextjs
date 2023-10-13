import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

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
  const exist = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: {
      user: true,
    },
  });
  if (!exist) {
    return res.status(400).json({
      ok: false,
      error: "Token not found",
    });
  }
  console.log(exist);
  req.session.user = {
    id: exist.user.id,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "mobicSession",
  password: process.env.SECRET_COOKIE_PASSWORD!,
});
