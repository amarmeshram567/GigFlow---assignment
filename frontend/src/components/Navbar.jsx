import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Briefcase, Menu, User, LogOut, FileText, ClipboardList, Plus, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAppContext()
    const location = useLocation();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        toast.success("Logged Out")
        navigate('/login');
    };

    const navLinks = [
        { href: '/gigs', label: 'Browse Gigs' },
        { href: '/my-gigs', label: 'My Gigs' },
        { href: '/my-bids', label: 'My Bids' },
    ];

    const isActive = (path) => location.pathname === path;

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        GigFlow
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated &&
                            navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`flex items-center gap-1 px-4 py-2 hover:text-gray-800 ${isActive(link.href) ? 'text-gray-800' : 'text-gray-500'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">

                        {isAuthenticated ? (
                            <>
                                {/* User Dropdown */}
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
                                    >
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border-gray-200 rounded shadow-md">
                                            <div className="p-3 border-b border-gray-200">
                                                <p className="font-medium capitalize">{user?.name}</p>
                                                <p className="text-sm text-gray-500">{user?.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-sm text-left px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/login"
                                    className="px-8 py-1.5 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}


                        {
                            isAuthenticated && (
                                <button
                                    className="md:hidden px-2 py-1 "
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            )
                        }

                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && isAuthenticated && (
                    <div className="md:hidden flex flex-col bg-white gap-2 px-4 py-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-2 rounded hover:text-gray-800 ${isActive(link.href) ? "text-gray-800 font-semibold" : "text-gray-500"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}


export default Navbar
