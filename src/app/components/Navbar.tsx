'use client'
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  name: string;
  href: string;
}

const navitems: NavItem[] = [
  // Can add more options as site expands
  {
    name: 'Today',
    href: '/'
  },
  {
    name: 'Archive',
    href: '/archive'
  },
]

export default function Navbar() {
  return (
    <nav className='sticky top-0 left-0 flex items-center gap-4 p-4 md:px-20 lg:px-40'>
      <motion.img 
        src='/Connections Logo.svg'
        width={50}
        height={50}
        alt='Connections archive logo'
        whileTap={{ rotate: 90 }}
        whileHover={{ rotate: 360 }}
      />
      <ul className='flex gap-4'>
        {navitems.map(({ name, href }, index) => (
          <NavItem 
            key={`${name}-${index}`}
            name={name}
            href={href}
          />
        ))}
      </ul>
    </nav>
  );
}

const NavItem = ({ name, href }: NavItem) => {
  
  return(  
    <li >
      <Link href={href}>
        <h2 className='text-[#0B1215] text-lg'>{name}</h2>  
      </Link>
    </li>  
  )
}
