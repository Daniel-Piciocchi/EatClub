'use client'

import { useState, useMemo } from 'react'
import { useRestaurants } from '@/hooks'
import { LoadingScreen } from '@/components/common'
import { RestaurantCard, SearchFilter } from '@/components/home'
import { sortRestaurantsByBestDeal, filterRestaurants } from '@/utils'

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
        return <div>Error: {error}</div>
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '24px' }}>Restaurant Deals</h1>

            <SearchFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {filteredAndSortedRestaurants.length === 0 ? (
                <p>No restaurants found matching your search.</p>
            ) : (
                <div>
                    {filteredAndSortedRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.objectId}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
