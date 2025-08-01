import React from 'react';
import styles from './Sider.module.css';
import { Link, useLocation } from 'react-router-dom';

export const SiderBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    return (
        <aside className={styles.sider}>
            <nav className={styles.menu}>
                <Link
                    to="/"
                    className={location.pathname === '/' ? styles.active : ''}
                >首页</Link>
                <Link
                    to="/about"
                    className={location.pathname === '/about' ? styles.active : ''}
                >About</Link>
                {children}
            </nav>
        </aside>
    );
}