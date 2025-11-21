'use client'

import { Logo } from './Logo'
import { ArrowLeftIcon, ProfileIcon, MenuToggleIcon } from './Icons'
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
                        className="header-back-button header-back-button--mobile"
                        aria-label="Back"
                    >
                        <ArrowLeftIcon />
                    </button>
                ) : (
                    <button
                        className="header-icon-button"
                        aria-label="Profile"
                        type="button"
                    >
                        <ProfileIcon />
                    </button>
                )}
                <Logo />
                {showBackButton ? (
                    <div className="header-spacer"></div>
                ) : (
                    <button
                        className="header-icon-button"
                        aria-label="Menu"
                        type="button"
                    >
                        <MenuToggleIcon />
                    </button>
                )}
            </div>
        </header>
    )
}
