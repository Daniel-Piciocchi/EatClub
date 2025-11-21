import './FoodPlaceholder.css'

interface FoodPlaceholderProps {
    cuisines?: string[]
    className?: string
}

const FoodIcon = () => (
    <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
)

const cuisineGradients: Record<string, string> = {
    Indian: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    Chinese: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    Japanese: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    Korean: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    Thai: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    Italian: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    Mexican: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
    Pizza: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    Seafood: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    Vegetarian: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    Vegan: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    Asian: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    Brazilian: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    Breakfast: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    Contemporary: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'Dim Sum': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    Dumplings: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'Fried Chicken': 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    Salads: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    Ribs: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    Soup: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    'SouthEast Asian': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
}

const defaultGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

export const FoodPlaceholder = ({
    cuisines,
    className = '',
}: FoodPlaceholderProps) => {
    const getGradient = () => {
        if (!cuisines || cuisines.length === 0) return defaultGradient
        for (const cuisine of cuisines) {
            if (cuisineGradients[cuisine]) {
                return cuisineGradients[cuisine]
            }
        }
        return defaultGradient
    }

    const gradient = getGradient()

    return (
        <div
            className={`food-placeholder ${className}`}
            style={{ background: gradient }}
        >
            <div className="food-placeholder-icon">
                <FoodIcon />
            </div>
        </div>
    )
}
