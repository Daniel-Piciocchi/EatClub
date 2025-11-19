import { Deal } from '@/data/types'
import './DealCard.css'

interface DealCardProps {
    deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
    const dealTime =
        deal.open && deal.close
            ? `Between ${deal.open} - ${deal.close}`
            : deal.start && deal.end
            ? `Between ${deal.start} - ${deal.end}`
            : 'Anytime today'

    return (
        <div className="deal-card">
            <div className="deal-card-header">
                <div className="deal-card-discount-section">
                    {deal.lightning === 'true' && (
                        <span className="deal-lightning-badge">
                            ⚡ Lightning Deal
                        </span>
                    )}
                    <span className="deal-discount-text">
                        {deal.discount}% Off
                    </span>
                </div>
            </div>

            <div className="deal-card-details">
                <div className="deal-detail-row">
                    <span className="deal-detail-icon">
                        {deal.dineIn === 'true' ? '🍽️' : '🥡'}
                    </span>
                    <span>
                        {deal.dineIn === 'true' ? 'Dine In' : 'Takeaway'}
                    </span>
                </div>

                <div className="deal-detail-row">
                    <span className="deal-detail-icon">⏰</span>
                    <span className="deal-time-text">{dealTime}</span>
                </div>

                <p className="deal-quantity">{deal.qtyLeft} Deals Left</p>
            </div>

            <button className="deal-redeem-button">Redeem</button>
        </div>
    )
}
