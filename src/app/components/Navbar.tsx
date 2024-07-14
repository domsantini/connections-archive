import Link from "next/link";

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
    <nav className='flex justify-between w-full px-4 py-4  bg-neutral-500'>
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
    <li>
      <Link href={href}>
        <h2 className='text-white text-lg'>{name}</h2>  
      </Link>
    </li>  
  )
}
