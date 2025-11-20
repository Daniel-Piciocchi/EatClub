import { Logo } from './Logo'
import './LoadingScreen.css'

export const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <Logo />
                <div className="loading-dots">
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                    <span className="loading-dot"></span>
                </div>
            </div>
        </div>
    )
}
