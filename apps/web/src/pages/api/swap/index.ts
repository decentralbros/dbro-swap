import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const url = new URL(req.url as string, `http://${req.headers.host}`)

  const { searchParams } = url

  const request = await fetch(`http://api.0x.org/swap/allowance-holder/quote?${searchParams}`, {
    headers: {
      '0x-api-key': process.env.ZERO_X_KEY as string,
      '0x-version': 'v2',
    },
  })

  const data = await request.json()

  console.dir(data)

  return res.json(data)
}

export default handler
