// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import getEntries from "../../../utils/getEntries"

type Data = {
  quote: {
    id: number
    body: string
    url: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const entries = await getEntries()

  const index = ~~(Math.random() * entries.length)

  const quote = {
    id: index + 1,
    body: entries[index],
    url: `https://watasalim.vercel.app/q/${index + 1}`,
  }

  res.status(200).json({ quote })
}
