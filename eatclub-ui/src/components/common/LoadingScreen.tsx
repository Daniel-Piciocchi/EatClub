import './LoadingScreen.css'

export const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading restaurants...</p>
            </div>
        </div>
    )
}
