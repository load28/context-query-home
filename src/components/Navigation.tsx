"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Github, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/docs`, label: t('docs') },
    { href: `/${locale}/examples`, label: t('examples') },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
      ? pathname.slice(`/${locale}`.length) 
      : pathname;
    const newPath = pathWithoutLocale === '' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;
    
    localStorage.setItem('preferred-locale', newLocale);
    router.push(newPath);
    setIsLangMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Context Query
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{locale.toUpperCase()}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLanguageChange(loc)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        locale === loc
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {loc === 'ko' ? '한국어' : 'English'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <a
              href="https://github.com/load28/context-query"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Language
                </span>
              </div>
              <div className="mt-2 space-y-1 pl-6">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      handleLanguageChange(loc);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left py-1 text-sm transition-colors ${
                      locale === loc
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {loc === 'ko' ? '한국어' : 'English'}
                  </button>
                ))}
              </div>
            </div>
            
            <a
              href="https://github.com/load28/context-query"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              <Github className="w-4 h-4 mr-2" />
              {t('github')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}