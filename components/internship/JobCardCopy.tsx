import type { IJobPost } from "@/types/index";
import {
	BriefcaseIcon,
	BuildingOffice2Icon,
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import type React from "react";

interface JobCardProps {
	jobPost: IJobPost;
}

const JobCard: React.FC<JobCardProps> = ({ jobPost }) => {
	// Function to format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	return (
		<Link
			href={`/details/${jobPost.id}`}
			className="block rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out"
		>
			<div className="px-6 py-4">
				<div className="font-medium text-lg mb-4">{jobPost.title}</div>
				<div className="border-t pt-4 mt-4 text-center" />
				<div className="flex justify-between items-start mb-4">
					<div className="flex flex-col space-y-2">
						<div className="flex items-center text-gray-700 text-xs mb-2">
							<BuildingOffice2Icon className="h-4 w-4 mr-1" />
							<span>{jobPost.company?.name}</span>
						</div>

						<div className="flex items-center text-gray-700 text-xs mb-2">
							<BriefcaseIcon className="h-4 w-4 mr-1" />
							<span>{jobPost.workplaceType}</span>
						</div>
						<div className="flex items-center text-gray-700 text-xs">
							<CalendarIcon className="h-4 w-4 mr-1" />
							<span>Deadline: {formatDate(jobPost.applicationDeadline)}</span>
						</div>
					</div>
					<div className="flex flex-col space-y-2 text-right">
						<div className="flex items-center text-gray-700 text-xs mb-2">
							<MapPinIcon className="h-4 w-4 mr-1" />
							<span>{jobPost.location}</span>
						</div>
						<div className="flex items-center text-gray-700 text-xs">
							<UsersIcon className="h-4 w-4 mr-1" />
							<span>Open positions: {jobPost.openPositions}</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default JobCard;
