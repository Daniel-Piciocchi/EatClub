'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRestaurantById } from '@/hooks'
import { LoadingScreen, Logo } from '@/components/common'
import { DealCard } from '@/components/restaurant'
import { sortDealsByDiscount } from '@/utils'
import './page.css'

export default function RestaurantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string

    const { restaurant, isLoading, error } = useRestaurantById(id)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">Error: {error}</div>
            </div>
        )
    }

    if (!restaurant) {
        return (
            <div className="not-found-container">
                <div className="not-found-message">Restaurant not found</div>
            </div>
        )
    }

    const sortedDeals = sortDealsByDiscount(restaurant.deals)

    return (
        <div className="restaurant-detail-page">
            <div className="detail-logo-header">
                <button
                    onClick={() => router.back()}
                    className="back-button"
                    aria-label="Back"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <Logo />
                <div className="back-button-spacer"></div>
            </div>
            <div className="restaurant-detail-container">
                <div className="restaurant-image-wrapper">
                    <img
                        src={restaurant.imageLink}
                        alt={restaurant.name}
                        className="restaurant-detail-image"
                        onError={(e) => {
                            e.currentTarget.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3EImage unavailable%3C/text%3E%3C/svg%3E'
                        }}
                    />
                </div>

                <div className="restaurant-detail-content">
                    <div className="restaurant-detail-header">
                        <h1 className="restaurant-detail-name">
                            {restaurant.name}
                        </h1>

                        <p className="restaurant-detail-cuisines">
                            {restaurant.cuisines.join(' • ')}
                        </p>

                        <div className="restaurant-detail-divider"></div>

                        <div className="restaurant-detail-info">
                            <p className="restaurant-info-text">
                                Hours: {restaurant.open} - {restaurant.close}
                            </p>

                            <p className="restaurant-info-text">
                                {restaurant.address1}, {restaurant.suburb}
                            </p>
                        </div>
                    </div>

                    <div className="restaurant-detail-divider"></div>

                    <h2 className="deals-section-title">Available Deals</h2>

                    {sortedDeals.map((deal) => (
                        <DealCard key={deal.objectId} deal={deal} />
                    ))}
                </div>
            </div>
        </div>
    )
}
