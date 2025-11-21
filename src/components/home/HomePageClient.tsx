'use client'

import { useEffect, useMemo, useState } from 'react'
import { RestaurantCard } from './RestaurantCard'
import { SearchFilter } from './SearchFilter'
import { Header, LoadingScreen } from '@/components/common'
import { filterRestaurants, sortRestaurantsByBestDeal } from '@/utils'
import { Restaurant } from '@/types'

interface HomePageClientProps {
    restaurants: Restaurant[]
}

export const HomePageClient = ({ restaurants }: HomePageClientProps) => {
    const [showIntroLoading, setShowIntroLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (typeof window === 'undefined') return
        const alreadySeen =
            window.sessionStorage.getItem('ec_seen_intro') === 'true'
        if (alreadySeen) {
            setShowIntroLoading(false)
            return
        }

        window.sessionStorage.setItem('ec_seen_intro', 'true')
        // brief intro screen shown only on first visit
        const timer = setTimeout(() => setShowIntroLoading(false), 3000)
        return () => clearTimeout(timer)
    }, [])

    const filteredAndSortedRestaurants = useMemo(() => {
        const filtered = filterRestaurants(restaurants, searchQuery)
        return sortRestaurantsByBestDeal(filtered)
    }, [restaurants, searchQuery])

    if (showIntroLoading) {
        return <LoadingScreen />
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
