import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import styles from  './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;