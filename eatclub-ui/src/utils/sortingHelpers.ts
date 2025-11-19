import { Restaurant, Deal, RestaurantWithBestDeal } from '@/data/types'

export const getBestDeal = (restaurant: Restaurant): Deal => {
    if (restaurant.deals.length === 0) {
        throw new Error('Restaurant has no deals')
    }

    const sortedDeals = [...restaurant.deals].sort((a, b) => {
        if (a.lightning !== b.lightning) {
            return a.lightning === 'true' ? -1 : 1
        }

        const discountDiff = Number(b.discount) - Number(a.discount)
        if (discountDiff !== 0) return discountDiff

        return Number(b.qtyLeft) - Number(a.qtyLeft)
    })

    return sortedDeals[0]
}

export const sortRestaurantsByBestDeal = (
    restaurants: Restaurant[]
): RestaurantWithBestDeal[] => {
    if (restaurants.length === 0) {
        return []
    }

    const restaurantsWithBestDeal = restaurants.map((restaurant) => ({
        ...restaurant,
        bestDeal: getBestDeal(restaurant),
    }))

    return restaurantsWithBestDeal.sort((a, b) => {
        const dealA = a.bestDeal
        const dealB = b.bestDeal

        if (dealA.lightning !== dealB.lightning) {
            return dealA.lightning === 'true' ? -1 : 1
        }

        const discountDiff = Number(dealB.discount) - Number(dealA.discount)
        if (discountDiff !== 0) return discountDiff

        return Number(dealB.qtyLeft) - Number(dealA.qtyLeft)
    })
}

export const sortDealsByDiscount = (deals: Deal[]): Deal[] => {
    if (deals.length === 0) {
        return []
    }

    return [...deals].sort((a, b) => {
        return Number(b.discount) - Number(a.discount)
    })
}
