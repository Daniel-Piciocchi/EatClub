import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch(
            'https://eccdn.com.au/misc/challengedata.json'
        )

        if (!response.ok) {
            throw new Error('Failed to fetch restaurants')
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch restaurants' },
            { status: 500 }
        )
    }
}
