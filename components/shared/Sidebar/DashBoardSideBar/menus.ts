import type { IRole } from "@/constants/roles";
import {
	AcademicCapIcon,
	BriefcaseIcon,
	BuildingLibraryIcon,
	BuildingOffice2Icon,
	Cog8ToothIcon,
	HomeIcon,
	// GlobeAltIcon,
	RectangleStackIcon,
	Squares2X2Icon,
	SwatchIcon,
	UserGroupIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaPeopleCarry } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { HiDesktopComputer } from "react-icons/hi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdAddTask } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

type MenuItemWithIcon = {
	name: string;
	href: string;
	icon: any;
	isCollapsible: boolean;
	roles?: IRole[];
};

export interface ExpandableMenu
	extends Omit<MenuItemWithIcon, "isCollapsible"> {
	items: MenuItemNoIcon[];
}

export interface SubMenus extends Omit<MenuItemWithIcon, "isCollapsible"> {
	parent: string;
}

type MenuItemNoIcon = Omit<
	Pick<
		MenuItemWithIcon,
		Exclude<keyof MenuItemWithIcon, "icon" | "isCollapsible">
	>,
	"isCollapsible"
>;

export const mainMenu: MenuItemWithIcon[] = [
	{
		name: "Welcome",
		href: "/welcome",
		icon: HiDesktopComputer,
		isCollapsible: false,
	},
	{
		name: "Home",
		href: "/home",
		icon: HomeIcon,
		isCollapsible: false,
	},
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["ADMIN"],
	},
	{
		name: "Dashboard",
		href: "/dashboard2",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN"],
	},
	{
		name: "Dashboard",
		href: "/dashboard3",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["COMPANY_ADMIN"],
	},
	{
		name: "Dashboard",
		href: "/dashboard4",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["STUDENT"],
	},
	{
		name: "Dashboard",
		href: "/dashboard5",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["TRAINER"],
	},
	{
		name: "Dashboard",
		href: "/dashboard6",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["SUPERVISOR"],
	},
	{
		name: "Schools",
		href: "/schools",
		icon: BuildingLibraryIcon,
		isCollapsible: false,
		roles: ["ADMIN"],
	},
	{
		name: "Sectors",
		href: "/sectors",
		icon: FaChartPie,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN"],
	},
	{
		name: "Students",
		href: "/students",
		icon: AcademicCapIcon,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN", "TRAINER"],
	},
	{
		name: "Companies",
		href: "/companies",
		icon: BuildingOffice2Icon,
		isCollapsible: false,
		roles: ["ADMIN"],
	},
	{
		name: "Academic years",
		href: "/academicYears",
		icon: SwatchIcon,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN"],
	},
	{
		name: "Staff",
		href: "/staff",
		icon: UsersIcon,
		isCollapsible: false,
		roles: ["COMPANY_ADMIN"],
	},
	{
		name: "School Staff",
		href: "/schoolStaff",
		icon: UsersIcon,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN"],
	},
	{
		name: "Internships",
		href: "/internships",
		icon: BriefcaseIcon,
		isCollapsible: false,
		roles: ["COMPANY_ADMIN"],
	},
	{
		name: "Tasks",
		href: "/task",
		icon: MdAddTask,
		isCollapsible: false,
		roles: ["SUPERVISOR"],
	},
	{
		name: "Internships",
		href: "/details",
		icon: BriefcaseIcon,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN", "TRAINER"],
	},
	{
		name: "Intern",
		href: "/intern",
		icon: FaPeopleCarry,
		isCollapsible: false,
		roles: ["SCHOOL_ADMIN", "TRAINER"],
	},
	{
		name: "Internships",
		href: "/application",
		icon: BriefcaseIcon,
		isCollapsible: false,
		roles: ["STUDENT"],
	},
	{
		name: "Tasks",
		href: "/my_tasks",
		icon: MdAddTask,
		isCollapsible: false,
		roles: ["STUDENT"],
	},
	{
		name: "Attendance",
		href: "/attendance",
		icon: FaRegCalendarAlt,
		isCollapsible: false,
		roles: ["SUPERVISOR"],
	},
	{
		name: "Attendance",
		href: "/attendances",
		icon: FaRegCalendarAlt,
		isCollapsible: false,
		roles: ["STUDENT"],
	},
	{
		name: "LogBook",
		href: "/logbook",
		icon: HiClipboardDocumentList,
		isCollapsible: false,
		roles: ["STUDENT"],
	},

	{
		name: "Subscriptions",
		href: "/subscriptions",
		icon: EnvelopeIcon,
		isCollapsible: false,
		roles: ["STUDENT"],
	},
	{
		name: "subscriptions",
		href: "#",
		icon: EnvelopeIcon,
		isCollapsible: true,
		roles: ["ADMIN"],
	},
];

export const secondaryMenu: MenuItemNoIcon[] = [];

export const bottomMenu: MenuItemWithIcon[] = [
	{
		name: "settings",
		href: "/settings",
		icon: Cog8ToothIcon,
		isCollapsible: false,
	},
	{
		name: "logout",
		href: "/logout",
		icon: RiLogoutCircleLine,
		isCollapsible: false,
	},
];

export const subMenus: SubMenus[] = [
	{
		name: "Subscribers",
		href: "/subscription",
		icon: UserGroupIcon,
		parent: "subscriptions",
	},
	{
		name: "Subscribe Amount",
		href: "/sub_amount",
		icon: RectangleStackIcon,
		parent: "subscriptions",
	},
];
