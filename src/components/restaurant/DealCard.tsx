import { Deal } from '@/types'
import { formatDealTimeWithPrefix } from '@/utils'
import { LightningIcon, ClockIcon } from '@/components/common/Icons'
import './DealCard.css'

interface DealCardProps {
    deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
    const dealTime = formatDealTimeWithPrefix(deal)

    return (
        <div className="deal-card">
            <div className="deal-card-header">
                <div className="deal-card-discount-section">
                    {deal.lightning === 'true' && (
                        <span className="deal-lightning-badge">
                            <LightningIcon />
                            Lightning Deal
                        </span>
                    )}
                    <span className="deal-discount-text">
                        {deal.discount}% Off
                    </span>
                </div>
            </div>

            <div className="deal-card-body">
                <div className="deal-card-details">
                    <div className="deal-detail-row">
                        <span className="deal-time-text">{dealTime}</span>
                    </div>

                    <p className="deal-quantity">{deal.qtyLeft} Deals Left</p>
                </div>

                <button className="deal-redeem-button">Redeem</button>
            </div>
        </div>
    )
}
