'use client'

import { useState, useMemo } from 'react'
import { useRestaurants } from '@/hooks'
import { LoadingScreen, Header } from '@/components/common'
import { RestaurantCard, SearchFilter } from '@/components/home'
import { sortRestaurantsByBestDeal, filterRestaurants } from '@/utils'
import './page.css'

export default function HomePage() {
    const { restaurants, isLoading, error } = useRestaurants()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredAndSortedRestaurants = useMemo(() => {
        const filtered = filterRestaurants(restaurants, searchQuery)
        return sortRestaurantsByBestDeal(filtered)
    }, [restaurants, searchQuery])

    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return (
            <div className="home-page">
                <div className="error-message">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="home-page">
            <Header />
            <div className="home-container">
                <SearchFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {filteredAndSortedRestaurants.length === 0 ? (
                    <p className="no-results">
                        No restaurants found matching your search.
                    </p>
                ) : (
                    <div className="restaurants-grid">
                        {filteredAndSortedRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.objectId}
                                restaurant={restaurant}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
