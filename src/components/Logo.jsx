import React from 'react'
import './Logo.css'

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="locker-icon">
                <div className="locker-body"></div>
                <div className="keyhole"></div>
            </div>
            <span className="logo-text">
                <span className="text-part1">Secure</span>
                <span className="text-part2">Vault</span>
            </span>
        </div>
    )
}

export default Logo
