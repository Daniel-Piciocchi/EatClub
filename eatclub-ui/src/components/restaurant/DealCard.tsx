import { Deal } from '@/data/types'
import { formatDealTimeWithPrefix } from '@/utils'
import './DealCard.css'

interface DealCardProps {
    deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
const dealTime = formatDealTimeWithPrefix(deal);

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
