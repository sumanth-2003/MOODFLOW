import { usePathname } from 'next/navigation';
import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'

export { NavbarItemCustom };

function NavbarItemCustom({ exact, href, children, sep = false, ...props }) {
    const pathname = usePathname();

    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        if(props.className) props.className += ' active';
        else props.className = 'active'
    }

    return (
        <NavbarItem isActive={isActive} aria-current={isActive ? 'page' : undefined}>
            <Link href={href} {...props} className={(isActive ? 'dark:text-white text-black text-bold' : 'text-zinc-400 dark:hover:text-white hover:text-black')}>
                {children}
            </Link>
            {sep &&  <span className="text-zinc-600 ms-4">/</span>}
        </NavbarItem>
    );
}