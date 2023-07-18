import React from 'react'

export const Footer = () => {
    let year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; {year} Mesto Russia</p>
        </footer>
    )
}