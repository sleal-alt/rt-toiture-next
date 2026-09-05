import { NextResponse } from 'next/server'

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJGRkBU0t9h2YRH6Gr09tK2ks'
const API_KEY = process.env.GOOGLE_PLACES_API_KEY

export const revalidate = 86400 // cache 24h

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=fr&reviews_sort=newest&key=${API_KEY}`
    const res = await fetch(url, { next: { revalidate: 86400 } })
    const data = await res.json()

    if (data.status !== 'OK') {
      return NextResponse.json({ error: data.status }, { status: 502 })
    }

    const { result } = data
    return NextResponse.json({
      rating: result.rating,
      total: result.user_ratings_total,
      reviews: (result.reviews || []).map(r => ({
        name: r.author_name,
        avatar: r.author_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        rating: r.rating,
        date: r.relative_time_description,
        text: r.text,
      })),
    })
  } catch (err) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
