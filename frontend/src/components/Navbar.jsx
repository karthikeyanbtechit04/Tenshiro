import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { FaGraduationCap, FaUserCircle, FaBars, FaSun, FaMoon, FaGlobe } from 'react-icons/fa';

const Navbar = ({ onToggleSidebar, onLoginClick, onRegisterClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    const isLandingPage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{
            height: 'var(--header-height, 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4rem',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: isScrolled ? 'var(--bg-glass, rgba(255, 255, 255, 0.8))' : 'transparent',
            backdropFilter: isScrolled ? 'blur(12px)' : 'none',
            borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
            boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.08)' : 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'var(--text-main)' }}>
                    <div className="brand-icon-wrap" style={{ background: '#1A3263', padding: '0.5rem', borderRadius: '12px', display: 'flex', boxShadow: '0 4px 12px rgba(26, 50, 99, 0.3)' }}>
                        <FaGraduationCap size={22} color="white" />
                    </div>
                    <span className="brand-text" style={{ fontSize: '1.6rem', fontWeight: '800' }}>Tenshiro</span>
                </Link>
            </div>

            {isLandingPage && (
                <div className="nav-center" style={{
                    display: 'flex',
                    gap: '2.5rem',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    <a href="#home" className="nav-link-saas" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }}>Dashboard</a>
                    <a href="#platform" className="nav-link-saas" onClick={(e) => { e.preventDefault(); document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }); }}>Domains</a>
                    <a href="#intelligence" className="nav-link-saas" onClick={(e) => { e.preventDefault(); document.getElementById('intelligence')?.scrollIntoView({ behavior: 'smooth' }); }}>Role Guidance</a>
                    <a href="#roadmaps" className="nav-link-saas" onClick={(e) => { e.preventDefault(); document.getElementById('roadmaps')?.scrollIntoView({ behavior: 'smooth' }); }}>Roadmap</a>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'nowrap', flexShrink: 0 }}>
                <button
                    onClick={toggleTheme}
                    className="btn-theme-toggle"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        opacity: 0.8,
                        transition: 'opacity 0.3s'
                    }}
                >
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>



                {user ? null : (
                    <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                        <button onClick={onLoginClick} style={{ background: 'none', border: 'none', fontWeight: '700', fontSize: '1rem', color: 'var(--text-main)', cursor: 'pointer', opacity: 0.9 }}>
                            Login
                        </button>
                        <button
                            onClick={onRegisterClick}
                            style={{
                                background: 'var(--text-main)',
                                color: 'var(--bg-secondary)',
                                padding: '12px 28px',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            className="btn-register-premium"
                        >
                            Get Started
                        </button>
                    </div>
                )}

                <button 
                    className="mobile-menu-btn" 
                    onClick={onToggleSidebar}
                    style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <FaBars />
                </button>
            </div>

            <style>{`
                .nav-link-saas {
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    letter-spacing: -0.01em;
                }
                .nav-link-saas:hover {
                    color: var(--primary);
                }
                .btn-theme-toggle:hover {
                    opacity: 1;
                }
                .btn-register-premium:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                @media (max-width: 1024px) {
                    .nav-center { display: none !important; }
                    .navbar { padding: 0 2rem !important; }
                }
                @media (max-width: 768px) {
                    .navbar { padding: 0 1.25rem !important; }
                    .hide-logout-mobile { display: none !important; }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
