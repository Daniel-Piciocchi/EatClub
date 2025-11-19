'use client'

interface SearchFilterProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export const SearchFilter = ({
    searchQuery,
    onSearchChange,
}: SearchFilterProps) => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <input
                type="text"
                placeholder="Search by name or cuisine (e.g. indian, pizza)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            />
        </div>
    )
}
