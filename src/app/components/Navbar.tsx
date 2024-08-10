'use client'
import React from 'react'
import Link from "next/link";
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
    // <nav className='sticky top-0 left-0 flex justify-between w-full px-4 py-4  border-b border-solid border-[#0B1215]'>
    <nav className='sticky top-0 left-0 flex justify-between w-full p-4'>
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
  
  const [currentPage, setCurrentPage] = React.useState<string>('')
  const [selected, setSelected] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const pathname = window.location.pathname
    setCurrentPage(pathname)
    
    if (href.includes(href)) {
      setSelected(true)
    }
  }, [window.location.pathname])
  
  console.log({selected})
  
  return(  
    <li >
      <Link href={href}>
        <h2 className='text-[#0B1215] text-lg'>{name}</h2>  
      </Link>
      
    </li>  
  )
}
