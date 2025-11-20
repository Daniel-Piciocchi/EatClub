'use client'

import { Logo } from './Logo'
import { ArrowLeftIcon } from './Icons'
import './Header.css'

interface HeaderProps {
    showBackButton?: boolean
    onBack?: () => void
}

export const Header = ({ showBackButton = false, onBack }: HeaderProps) => {
    return (
        <header className="header">
            <div className="header-content">
                {showBackButton ? (
                    <button
                        onClick={onBack}
                        className="header-back-button"
                        aria-label="Back"
                    >
                        <ArrowLeftIcon />
                    </button>
                ) : (
                    <div className="header-spacer"></div>
                )}
                <Logo />
                <div className="header-spacer"></div>
            </div>
        </header>
    )
}
