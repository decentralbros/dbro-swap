import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const url = new URL(req.url as string, `http://${req.headers.host}`)

  const { searchParams } = url

  const request = await fetch(`https://arbitrum.api.0x.org/swap/v1/price?${searchParams}`, {
    headers: {
      '0x-api-key': process.env.ZERO_X_KEY as string,
    },
  })
  const data = await request.json()

  return res.json(data)
}

export default handler
