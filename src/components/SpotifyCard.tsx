import { Suspense } from 'react'
import { headers } from 'next/headers'
import { IconLoader2 } from '@tabler/icons-react'
import SpotifyCardClient from './SpotifyCardClient'
import { Song } from '@/lib/spotify'

interface SpotifyStatusResponse {
  song: Song | null
  isPlaying: boolean
  played_at?: string // Optional timestamp for last played
}

async function getSpotifyStatus() {
  try {
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!baseUrl) {
      const headersList = await headers()
      const host = headersList.get('host')
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
      baseUrl = `${protocol}://${host}`
    }

    const res = await fetch(`${baseUrl}/api/spotify/status`, {
      next: { revalidate: 30 }, // Cache for 30 seconds
    })

    if (!res.ok) return null

    const data: SpotifyStatusResponse = await res.json()
    return data
  } catch (err) {
    console.error('Failed to fetch spotify status:', err)
    return null
  }
}

async function SpotifyContent() {
  const data = await getSpotifyStatus()

  return <SpotifyCardClient data={data} />
}

export default function SpotifyCard() {
  return (
    <Suspense fallback={<div />}>
      <SpotifyContent />
    </Suspense>
  )
}