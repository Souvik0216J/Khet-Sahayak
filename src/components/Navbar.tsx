// components/Navbar.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, Globe, Menu, X, LogIn } from 'lucide-react'
import { Button } from './ui/button'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isLangDropdownOpen, setLangDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/community', label: 'Community' },
    { href: '/dashboard', label: 'Dashboard' },
  ]

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full bg-white/70 px-6 shadow-lg shadow-gray-500/5 backdrop-blur-lg dark:bg-black/70 dark:shadow-gray-900/5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Khet Sahayak
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!isLangDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 100)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Select language"
            >
              <Globe size={20} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">English</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Español</a>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/signin"
            className="hidden md:flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Enter
            <LogIn className="h-4 w-4" />
          </Link>


          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-5xl rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-lg dark:bg-black/80 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.href}`}
                href={link.href}
                className="rounded-md px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar