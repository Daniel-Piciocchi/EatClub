import { HomePageClient } from '@/components/home'
import { fetchRestaurants } from '@/utils/restaurant_service'
import './page.css'

export default async function HomePage() {
    try {
        const restaurants = await fetchRestaurants()
        return <HomePageClient restaurants={restaurants} />
    } catch (error) {
        return (
            <div className="home-page">
                <div className="error-message">
                    Failed to load restaurants. Please try again later.
                </div>
            </div>
        )
    }
}
