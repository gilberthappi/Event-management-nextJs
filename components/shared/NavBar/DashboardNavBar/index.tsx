import {
	getAllMyNotifications,
	markNotificationAsRead,
} from "@/services/notification";
import type { INotifications } from "@/types/index";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { MenuIcon } from "../../CustomIcons";

const DashboardNavBar = ({
	sidebarOpen,
	setSidebarOpen,
}: {
	sidebarOpen: boolean;
	// eslint-disable-next-line no-unused-vars
	setSidebarOpen: (_x: boolean) => void;
}) => {
	const { data } = useSession();
	const [notifications, setNotifications] = useState<INotifications[]>([]);
	const [showNotifications, setShowNotifications] = useState(false);
	const notificationRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getAllMyNotifications().then((notifications) =>
			setNotifications(notifications),
		);
	}, [data]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				notificationRef.current &&
				!notificationRef.current.contains(event.target as Node)
			) {
				setShowNotifications(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		signOut({ callbackUrl: "/" });
	};

	const handleNotificationClick = () => {
		setShowNotifications(!showNotifications);
	};

	const handleNotificationItemClick = async (notification: INotifications) => {
		await markNotificationAsRead(notification.id);
		setNotifications((prevNotifications) =>
			prevNotifications.map((n) =>
				n.id === notification.id ? { ...n, read: true } : n,
			),
		);
	};

	const getNotificationLink = (notification: INotifications) => {
		if (notification.type === "TASK_ASSIGNED") {
			return `/submission/${notification.actionId}`;
		}
		if (
			notification.type === "APPLICATION_APPROVED" ||
			notification.type === "APPLICATION_SHORTLISTED" ||
			notification.type === "APPLICATION_REJECTED"
		) {
			return `/application/${notification.actionId}`;
		}
		return "#";
	};

	const unreadNotifications = notifications.filter(
		(notification) => !notification.read,
	);

	return (
		<div className="z-10 flex flex-shrink-0 h-16 bg-white border-b">
			<div className="flex justify-end flex-1 px-4 md:px-8">
				<div className="flex items-center ml-4 md:ml-6">
					{/* Notification Icon */}
					<div className="relative ml-4" ref={notificationRef}>
						<button
							type="submit"
							onClick={handleNotificationClick}
							className="relative flex items-center text-gray-500"
						>
							<BellIcon type="submit" className="w-6 h-6" aria-hidden="true" />
							{unreadNotifications.length > 0 && (
								<span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full" />
							)}
						</button>
						{/* Notifications Dropdown */}
						<Transition
							show={showNotifications}
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<div className="absolute right-0 w-80 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
								<div className="py-1">
									{unreadNotifications.length === 0 ? (
										<div className="px-4 py-2 text-sm text-gray-700">
											No new notifications
										</div>
									) : (
										unreadNotifications.map((notification) => (
											<Link
												key={notification.id}
												href={getNotificationLink(notification)}
												className="block px-4 py-2 text-sm text-gray-700 border-b hover:bg-gray-100"
												onClick={() =>
													handleNotificationItemClick(notification)
												}
											>
												<div className="flex justify-between">
													<span>{notification.message}</span>
												</div>
											</Link>
										))
									)}
								</div>
							</div>
						</Transition>
					</div>
					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="flex items-center max-w-xs text-sm bg-primary p-3 text-white rounded-full ml-3">
								<div className="flex items-center px-2">
									<h4 className="mr-3">{data?.user?.name}</h4>
									<ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
								</div>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
								<Menu.Item>
									{({ active }) => (
										<button
											type="button"
											onClick={handleLogout}
											className={`${
												active ? "bg-gray-100" : ""
											} block py-2 px-4 text-sm text-gray-700 w-full text-left`}
										>
											Logout
										</button>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
			<button
				title="sidebar"
				type="button"
				className="px-4 text-gray-500 border-r outline-none border-gray-200 focus:outline-none lg:hidden"
				onClick={() => setSidebarOpen(!sidebarOpen)}
			>
				<MenuIcon />
			</button>
		</div>
	);
};

export default DashboardNavBar;
