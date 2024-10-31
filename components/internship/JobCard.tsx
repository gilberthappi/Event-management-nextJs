import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
	apply,
	hasApplied,
	isAcceptingApplications,
} from "@/services/application";
import { getJobPost } from "@/services/jobPost";
import { subscribedIntern } from "@/services/subscription";
import type { IJobPost } from "@/types/index";
import {
	BriefcaseIcon,
	BuildingOffice2Icon,
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";

interface JobCardProps {
	jobPost: IJobPost;
}

const JobCard: React.FC<JobCardProps> = ({ jobPost }) => {
	const [hasAppliedToJob, setHasAppliedToJob] = useState(false);
	const [hasSubscribed, setHasSubscribed] = useState(false);
	const [acceptingApplications, setAcceptingApplications] = useState(true);
	const jobId = jobPost.id;

	const { data: job, isLoading } = useQuery({
		queryKey: ["APPLICANT_JOB_POSTS", jobId],
		queryFn: () => getJobPost(jobId as string),
	});

	useEffect(() => {
		const checkIfApplied = async () => {
			if (job) {
				const applied = await hasApplied(jobId as string);
				setHasAppliedToJob(applied);
			}
		};

		const checkIfSubscribed = async () => {
			const subscribed = await subscribedIntern();
			setHasSubscribed(subscribed);
		};

		const checkAcceptingApplications = async () => {
			const accepting = await isAcceptingApplications(jobId as string);
			setAcceptingApplications(accepting);
		};

		checkIfSubscribed();
		checkIfApplied();
		checkAcceptingApplications();
	}, [jobId, job]);

	if (isLoading || !job) return <Loader />;

	const handleApplyNow = async () => {
		try {
			await apply({ jobPostId: jobId as string });
			setHasAppliedToJob(true);
		} catch (error) {
			console.error("Error applying for job:", error);
		}
	};

	const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		window.location.href = "/subscriptions";
	};

	// Function to format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	return (
		<div className="block rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out">
			<div className="px-6 py-4">
				<Link href={`/application/${jobPost.id}`}>
					<div className="font-medium text-lg mb-4">{jobPost.title}</div>
				</Link>
				<div className="border-t pt-4 mt-4 text-center" />
				<div className="flex justify-between items-start mb-4">
					<Link href={`/application/${jobPost.id}`}>
						<div className="flex flex-col space-y-2">
							<div className="flex items-center text-gray-700 text-xs mb-2">
								<BuildingOffice2Icon className="h-4 w-4 mr-1" />
								<span>{jobPost.company.name}</span>
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
					</Link>
					<div className="flex flex-col space-y-2 text-right">
						<Link href={`/application/${jobPost.id}`}>
							<div className="flex items-center text-gray-700 text-xs mb-2">
								<MapPinIcon className="h-4 w-4 mr-1" />
								<span>{jobPost.location}</span>
							</div>
							<div className="flex items-center text-gray-700 text-xs">
								<UsersIcon className="h-4 w-4 mr-1" />
								<span>Open positions: {jobPost.openPositions}</span>
							</div>
						</Link>
						<div className="flex items-center text-gray-700 text-xs">
							{!hasSubscribed ? (
								<Button
									className="py-2 px-4 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
									onClick={handleSubscribe}
								>
									Subscribe to Apply
								</Button>
							) : (
								<>
									<Link href={`/application/${jobPost.id}`}>
										{acceptingApplications ? (
											<Button
												className={`py-2 px-4 rounded-lg inline-block ${
													hasAppliedToJob
														? "bg-gray-400 cursor-not-allowed"
														: "bg-blue-900 text-white hover:bg-blue-800"
												}`}
												onClick={hasAppliedToJob ? undefined : handleApplyNow}
											>
												{hasAppliedToJob ? "Already Applied" : "Apply Now"}
											</Button>
										) : (
											<p className="text-red-500 text-sm">
												This job is no longer accepting applications.
											</p>
										)}
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobCard;
