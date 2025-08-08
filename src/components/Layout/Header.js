import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
    const location = useLocation();
    
    const navItems = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/search', label: 'Search', icon: '🔍' },
        { path: '/gallery', label: 'Gallery', icon: '📚' },
        { path: '/new', label: 'New Review', icon: '✍️' }
    ];
    
    return (
        <header className={styles.Header}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link to="/" className={styles.title}>
                        At the End of the Shelf
                    </Link>
                    <span className={styles.subtitle}>A Working Library</span>
                </div>
                
                <nav className={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                
                <div className={styles.searchSection}>
                    <Link to="/search" className={styles.searchButton}>
                        <span className={styles.searchIcon}>🔍</span>
                        <span>Search Books</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header;