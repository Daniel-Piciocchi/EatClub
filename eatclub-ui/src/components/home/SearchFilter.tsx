'use client'

import './SearchFilter.css'

interface SearchFilterProps {
    searchQuery: string
    onSearchChange: (query: string) => void
}

export const SearchFilter = ({
    searchQuery,
    onSearchChange,
}: SearchFilterProps) => {
    return (
        <div className="search-filter">
            <input
                type="text"
                placeholder="e.g. chinese, pizza"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
        </div>
    )
}
