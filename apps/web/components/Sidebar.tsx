'use client';

import Link from 'next/link';
import { cn } from '../utils';
import {
  LayoutGrid,
  Settings,
  Menu,
  FileCode,
  Users,
  Trophy,
} from 'lucide-react';
import logo from '../public/그룹 2.svg';
import menuLogo from '../public/menu_open_24dp_FILL0_wght400_GRAD0_opsz24 1.svg';
import Image from 'next/image';
import { useState } from 'react';

const menuItems = [
  {
    title: 'Systems',
    icon: LayoutGrid,
    href: '/systems',
  },
  {
    title: 'SystemCode',
    icon: LayoutGrid,
    href: '/systems-code',
  },
  {
    title: 'Properties',
    icon: Settings,
    href: '/properties',
  },
  {
    title: 'Menus',
    icon: Menu,
    href: '/menus',
  },
  {
    title: 'API List',
    icon: FileCode,
    href: '/api-list',
  },
];

const links2 = [
  {
    title: 'Users & Group',
    icon: Users,
    href: '/users',
  },
  {
    title: 'Competition',
    icon: Trophy,
    href: '/competition',
  },
];

export function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div
      className={`w-${isMenuOpen ? '64' : '16'} border-r m-5 rounded-3xl bg-[#101828] text-white md:block hidden`}
    >
      <div className="p-6 flex justify-between items-center">
        <h1 className={`text-xl font-bold ${isMenuOpen ? '' : 'hidden'}`}>
          <Image width={80} height={24} src={logo} alt="logo" />
        </h1>
        <button onClick={toggleMenu}>
          <Image width={24} height={24} alt="menu" src={menuLogo} />
        </button>
      </div>
      <nav className="space-y-1 bg-[#1D2939] mx-4 rounded-3xl py-4 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 font-semibold rounded-2xl px-3 py-2.5 text-sm transition-colors',
              item.title === 'Menus'
                ? 'bg-[#9FF443] text-white'
                : 'text-white hover:bg-gray-800',
            )}
          >
            <item.icon className="h-4 w-4" />
            {isMenuOpen && item.title}
          </Link>
        ))}
      </nav>
      <nav className="space-y-1 mx-4 rounded-3xl py-4 px-2">
        {links2.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 font-semibold px-3 py-2.5 text-sm transition-colors',
              item.title === 'Menus'
                ? 'bg-[#4ADE80] text-white'
                : 'text-white hover:bg-gray-800',
            )}
          >
            <item.icon className="h-4 w-4" />
            {isMenuOpen && item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
