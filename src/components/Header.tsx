import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Truck, User, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { name: 'Главная', href: '/' },
      { name: 'Прайс', href: '/pricing' },
      { name: 'Контакты', href: '#contacts' },
    ];
    
    // Добавляем "Сделать заказ" только для неавторизованных пользователей
    if (!isAuthenticated) {
      baseItems.splice(2, 0, { name: 'Сделать заказ', href: '#calculator' });
    }
    
    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" onClick={handleHomeClick} className="flex items-center">
              <img 
                src="/LOGOAKSAY.png" 
                alt="Аксай Логистик" 
                className="h-36 lg:h-42 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={item.name === 'Главная' ? handleHomeClick : undefined}
                className="text-gray-700 hover:text-primary-800 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={location.pathname === '/' ? '#calculator' : '/#calculator'}
              className="flex items-center bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Оформить заявку
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.name === 'Главная') handleHomeClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-primary-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <div className="flex space-x-3">
                  <a
                    href={location.pathname === '/' ? '#calculator' : '/#calculator'}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center bg-accent-500 text-white hover:bg-accent-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    Оформить заявку
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;