'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRestaurantById } from '@/hooks'
import { LoadingScreen } from '@/components/common'
import { DealCard } from '@/components/restaurant'
import { sortDealsByDiscount } from '@/utils'

export default function RestaurantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { restaurant, isLoading, error } = useRestaurantById(id)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!restaurant) {
        return <div>Restaurant not found</div>
    }

    const sortedDeals = sortDealsByDiscount(restaurant.deals)

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => router.back()}
                style={{
                    marginBottom: '20px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                }}
            >
                ← Back
            </button>

            <img
                src={restaurant.imageLink}
                alt={restaurant.name}
                style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '20px',
                }}
            />

            <h1 style={{ marginBottom: '8px' }}>{restaurant.name}</h1>

            <p style={{ color: '#666', marginBottom: '8px' }}>
                📍 {restaurant.address1}, {restaurant.suburb}
            </p>

            <p style={{ color: '#666', marginBottom: '8px' }}>
                🍽️ {restaurant.cuisines.join(', ')}
            </p>

            <p style={{ color: '#666', marginBottom: '24px' }}>
                ⏰ {restaurant.open} - {restaurant.close}
            </p>

            <h2 style={{ marginBottom: '16px' }}>Available Deals</h2>

            {sortedDeals.map((deal) => (
                <DealCard key={deal.objectId} deal={deal} />
            ))}
        </div>
    )
}
