import { Deal } from '@/data/types'

interface DealCardProps {
    deal: Deal
}

export const DealCard = ({ deal }: DealCardProps) => {
    const dealTime =
        deal.open && deal.close
            ? `${deal.open} - ${deal.close}`
            : deal.start && deal.end
            ? `${deal.start} - ${deal.end}`
            : 'Anytime today'

    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '8px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                }}
            >
                <div>
                    {deal.lightning === 'true' && (
                        <span
                            style={{
                                backgroundColor: '#ff6b6b',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                marginRight: '8px',
                            }}
                        >
                            ⚡ Lightning Deal
                        </span>
                    )}
                    <span
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#e63946',
                        }}
                    >
                        {deal.discount}% Off
                    </span>
                </div>
            </div>

            <p style={{ color: '#666', marginBottom: '4px' }}>
                {deal.dineIn === 'true' ? '🍽️ Dine In' : '🥡 Takeaway'}
            </p>

            <p style={{ color: '#666', marginBottom: '4px' }}>⏰ {dealTime}</p>

            <p style={{ color: '#666', fontSize: '14px' }}>
                {deal.qtyLeft} deals remaining
            </p>
        </div>
    )
}
