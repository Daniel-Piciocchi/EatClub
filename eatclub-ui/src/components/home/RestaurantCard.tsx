'use client'

import { useRouter } from 'next/navigation'
import { RestaurantWithBestDeal } from '@/data/types'

interface RestaurantCardProps {
    restaurant: RestaurantWithBestDeal
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/restaurant/${restaurant.objectId}`)
    }

    return (
        <div
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '16px',
                marginBottom: '16px',
            }}
        >
            <img
                src={restaurant.imageLink}
                alt={restaurant.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />

            <h2>{restaurant.name}</h2>

            <p>
                {restaurant.address1}, {restaurant.suburb}
            </p>

            <p>{restaurant.cuisines.join(', ')}</p>

            <div style={{ marginTop: '12px' }}>
                {restaurant.bestDeal.lightning === 'true' && (
                    <span
                        style={{
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            padding: '4px 8px',
                            marginRight: '8px',
                        }}
                    >
                        ⚡ Lightning
                    </span>
                )}
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                    {restaurant.bestDeal.discount}% off
                </span>
            </div>

            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                {restaurant.bestDeal.qtyLeft} deals left
            </p>
        </div>
    )
}
