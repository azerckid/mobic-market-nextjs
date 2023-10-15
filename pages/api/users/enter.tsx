import twilio from "twilio";
import mail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

mail.setApiKey(process.env.SENDGRID_API_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body);
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({
      ok: false,
      error: "No phone or email provided",
    });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      body: `Your verification code is ${payload}`,
      from: process.env.TWILIO_PHONE,
      to: process.env.MY_PHONE!,
    });
    console.log(message);
  } else if (email) {
    const message = {
      to: process.env.SENDGRID_FROM!,
      from: process.env.SENDGRID_FROM!,
      subject: "Your verification code",
      text: `Your verification code is ${payload}`,
      html: `<strong>Your mobic-market verification code is ${payload}</strong>`,
    };
    const emailResponse = await mail.send(message);
    console.log(emailResponse);
  }
  return res.status(200).json({
    ok: true,
    token: token.payload,
  });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
