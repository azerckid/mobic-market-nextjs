import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    if (isPrivate) {
      // @ts-ignore
      if (!req.user) {
        return res.status(401).json({ ok: false, error: "Unauthorized" });
      }
    }
    if (!methods.includes(req.method as method)) {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }
    return handler(req, res);
  };
}
