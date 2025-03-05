import { utils } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

const { verifyMessage } = utils

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, signature, address } = req.body

  try {
    const recoveredAddress = verifyMessage(message, signature)
    const isValid = recoveredAddress.toLowerCase() === address.toLowerCase()

    if (!isValid) {
      return res.status(400).json({ isValid, error: 'Invalid signature' })
    }

    return res.status(200).json({ isValid })
  } catch (error) {
    return res.status(500).json({ isValid: false, error: 'Invalid signature' })
  }
}
