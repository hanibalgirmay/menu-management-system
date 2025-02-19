"use client";

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
  return (
    <div className="w-64 border-r m-5 rounded-3xl bg-[#101828] text-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">CLOIT</h1>
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
            {item.title}
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
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
