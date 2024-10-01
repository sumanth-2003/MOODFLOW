'use client'
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, User, Avatar, Input, NavbarMenu, NavbarMenuItem, Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons";
import Link from "next/link";
import { NavbarItemCustom } from "./NavbarItemCustom";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { usePathname } from 'next/navigation'

export default function App() {
	const { data: session, status } = useSession()
	const pathname = usePathname()

	const icons = {
		chevron: <ChevronDown fill="currentColor" size={16} />,
		scale: <Scale className="text-warning" fill="currentColor" size={30} />,
		lock: <Lock className="text-success" fill="currentColor" size={30} />,
		activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
		flash: <Flash className="text-primary" fill="currentColor" size={30} />,
		server: <Server className="text-success" fill="currentColor" size={30} />,
		user: <TagUser className="text-danger" fill="currentColor" size={30} />,
	};

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSearch = async (text) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/search?type=article&search=${encodeURIComponent(text)}`);
			if (!response.ok) {
				throw new Error("Failed to fetch");
			}
			const data = await response.json();
			setSearchResults(data.results);
		} catch (error) {
			// setError(error.message);
			setSearchResults([])
			console.log(error)
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchText) {
				handleSearch(searchText);
			} else {
				setSearchResults([]);
			}
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, [searchText]);

	const renderHighlightText = (texts) => {
		return texts?.map((text, index) => (
			<span
				key={index}
				className={text.type === 'hit' ? 'bg-yellow-200 text-black' : ''}
			>
				{text.value}
			</span>
		));
	};

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Archived Issues", href: "/archives" },
		{ name: "About Us", href: "/about-us" },
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="2xl" className="select-none">
			<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItemCustom exact href="/" sep>
					Home
				</NavbarItemCustom>
				<NavbarItemCustom href="/archives" sep>
					Archived Issues
				</NavbarItemCustom>
				<NavbarItem>
					<Dropdown>
						<DropdownTrigger>
							<Button
								disableRipple
								className="p-0 bg-transparent data-[hover=true]:bg-transparent text-zinc-400 hover:text-black text-md"
								endContent={icons.chevron}
								radius="lg"
							>
								Categories
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Categories"
							className="w-[200px]"
							itemClasses={{
								base: "gap-4",
							}}
						>
								<DropdownItem href={'/journal'}>
									Journal
								</DropdownItem>
								<DropdownItem href={'/journal'}>
									Journal
								</DropdownItem>
								<DropdownItem href={'/journal'}>
									Journal
								</DropdownItem>
						</DropdownMenu>
					</Dropdown> <span className="text-zinc-600 ms-4">/</span>
				</NavbarItem>
				<NavbarItemCustom href="/about-us">
					About Us
				</NavbarItemCustom>
			</NavbarContent>

			<NavbarContent as="div" className="items-center relative" justify="end">
				<Input
					classNames={{
						base: "max-w-full sm:max-w-[15rem] h-10",
						inputWrapper: "h-full font-normal text-default-500 bg-default-400/20",
					}}
					placeholder="Type to search..."
					size="sm"
					type="search"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>

				{searchText && (
					<div className="absolute top-full mt-2 bg-white opacity-90 backdrop-blur-lg p-4 z-10 top-[45px] right-[55px] rounded border-gray-300">
						{loading ? <Spinner /> : searchResults.length > 0 ? (
							searchResults.map((result) => (
								<div key={result._id} className="mb-2">
									<Link href={`/article/${result.slug}`} onClick={() => { setSearchText(''); setSearchResults([]); }} className="block text-blue-500 hover:underline">
										{renderHighlightText(result.highlights?.find((h) => h.path === 'title')?.texts) || result.title}
									</Link>
									<p>{renderHighlightText(result.highlights?.find((h) => h.path === 'shortDesc')?.texts) || result.shortDesc}</p>
								</div>
							))
						) : (
							<p>No results found</p>
						)}
					</div>
				)}

				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							as="button"
							className="transition-transform"
							color="secondary"
							name="User Avatar"
							size="md"
							src={session?.user?.picture || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
						/>
					</DropdownTrigger>

					{
						session?.user ? <DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem href={"/author/" + session.user.username} key="profile" className="h-14 gap-2" as={Link}>
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">{session.user.email}</p>
							</DropdownItem>
							<DropdownItem href="/admin" key="admin" as={Link}>Admin</DropdownItem>
							<DropdownItem href="/profile/settings" key="settings" as={Link}>Settings</DropdownItem>
							<DropdownItem href="/profile/analytics" key="analytics" as={Link}>Analytics</DropdownItem>
							<DropdownItem onClick={async (e) => {
								e.preventDefault()
								await signOut({ redirect: false })
								toast.success('Logout Successful!');
							}} key="logout" color="danger">Log Out</DropdownItem>
						</DropdownMenu> : <DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem href={"/login?next=" + pathname} key="login" as={Link}>Log In</DropdownItem>
						</DropdownMenu>
					}

				</Dropdown>
			</NavbarContent>
			<NavbarMenu className="pt-[5rem]">
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={index}>
						<Link href={item.href} className="w-full" onClick={() => setIsMenuOpen(false)}>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
