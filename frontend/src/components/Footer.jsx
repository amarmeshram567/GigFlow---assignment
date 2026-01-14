import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import React from 'react';

const Footer = () => {
    const socialLinks = [
        { icon: Facebook, url: '#' },
        { icon: Twitter, url: '#' },
        { icon: Linkedin, url: '#' },
        { icon: Instagram, url: '#' },
    ];

    const quickLinks = [
        { label: 'Home', href: '/' },
        { label: 'Gigs', href: '/gigs' },
        { label: 'Login', href: '/login' },
        { label: 'Contact', href: '/contact' },
    ];

    const resources = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Help Center', href: '/help' },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-gray-700">
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-900">GigFlow</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Connecting talent with opportunity, one gig at a time.
                    </p>

                    {/* Social Media */}
                    <div className="flex gap-3 mt-2">
                        {socialLinks.map((social, idx) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-blue-500 transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        {quickLinks.map((link, idx) => (
                            <li key={idx}>
                                <Link to={link.href} className="hover:text-blue-500 transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                    <ul className="flex flex-col gap-2 text-sm">
                        {resources.map((link, idx) => (
                            <li key={idx}>
                                <Link to={link.href} className="hover:text-blue-500 transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                    <p className="text-sm text-gray-500 mb-2">Email: support@gigflow.com</p>
                    <p className="text-sm text-gray-500 mb-2">Phone: +91 12345 67890</p>
                    <p className="text-sm text-gray-500">Address: 123, Startup Street, India</p>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} GigFlow. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

