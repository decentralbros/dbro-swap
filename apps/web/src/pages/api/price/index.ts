/* eslint-disable no-console */
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const url = new URL(req.url as string, `http://${req.headers.host}`)

  const { searchParams } = url

  try {
    const response = await fetch(`https://api.0x.org/swap/permit2/price?${searchParams}`, {
      headers: {
        '0x-api-key': process.env.NEXT_PUBLIC_ZERO_X_KEY as string,
      },
    })
    const data = await response.json()

    console.log('price api', `https://api.0x.org/swap/permit2/price?${searchParams}`)

    console.log('price data', data)

    return res.json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

export default handler
