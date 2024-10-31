"use client";
import PageContent from "@/components/shared/PageContent";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import {
	apply,
	hasApplied,
	isAcceptingApplications,
	isShortlistedOrApproved,
} from "@/services/application";
import { getJobPost } from "@/services/jobPost";
import { subscribedIntern } from "@/services/subscription";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

const JobDetailsPage: React.FC = () => {
	const { id } = useParams();
	const [hasAppliedToJob, setHasAppliedToJob] = useState(false);
	const [hasSubscribed, setHasSubscribed] = useState(false);
	const [canSeeOnBoardingRequirements, setCanSeeOnBoardingRequirements] =
		useState(false);
	const [acceptingApplications, setAcceptingApplications] = useState(true);

	const { data: jobPost, isLoading } = useQuery({
		queryKey: ["APPLICANT_JOB_POSTS", id],
		queryFn: () => getJobPost(id as string),
	});

	useEffect(() => {
		const checkIfApplied = async () => {
			if (jobPost) {
				const applied = await hasApplied(id as string);
				setHasAppliedToJob(applied);
			}
		};

		const checkIfSubscribed = async () => {
			const subscribed = await subscribedIntern();
			setHasSubscribed(subscribed);
		};

		const checkStatus = async () => {
			if (jobPost) {
				const studentStatus = await isShortlistedOrApproved(id as string);
				setCanSeeOnBoardingRequirements(studentStatus);
			}
		};

		const checkAcceptingApplications = async () => {
			const accepting = await isAcceptingApplications(id as string);
			setAcceptingApplications(accepting);
		};

		checkIfSubscribed();
		checkIfApplied();
		checkStatus();
		checkAcceptingApplications();
	}, [id, jobPost]);

	if (isLoading || !jobPost) return <Loader />;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return format(date, "dd MMMM yyyy");
	};

	const handleApplyNow = async () => {
		try {
			await apply({ jobPostId: id as string });
			setHasAppliedToJob(true);
		} catch (error) {
			console.error("Error applying for job:", error);
		}
	};

	const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		window.location.href = "/subscriptions";
	};
	return (
		<PageContent>
			<Link href="/application">
				<Button variant="ghost">
					<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
				</Button>
			</Link>
			<div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="text-black">
					<section className="mb-8">
						<h2 className="text-xl font-medium mb-3">Job Description</h2>
						<p className="text-gray-700 text-sm">
							{jobPost.description.replace(/<\/?[^>]+(>|$)/g, "")}
						</p>
					</section>
					{canSeeOnBoardingRequirements && (
						<section className="mb-8">
							<h2 className="text-xl font-medium mb-3">
								Onboarding Requirements
							</h2>
							<p className="text-gray-700 text-sm">
								{jobPost.onBoardingRequirements.replace(/<\/?[^>]+(>|$)/g, "")}
							</p>
						</section>
					)}
					<section className="mb-8 h-10">
						<p className="text-sm font-medium">
							<strong>Application Deadline:</strong>{" "}
							{formatDate(jobPost.applicationDeadline)}
						</p>
					</section>
					<section className="mb-2 h-10">
						{!hasSubscribed ? (
							<Button
								className="py-2 px-4 rounded-lg inline-block bg-blue-900 text-white hover:bg-blue-800"
								onClick={handleSubscribe}
							>
								Subscribe to Apply
							</Button>
						) : (
							<>
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
							</>
						)}
					</section>
				</div>
				<div className="bg-blue-900 text-white rounded-lg p-8 flex-1">
					<div className="mb-4 h-10">
						<h2 className="text-xl font-medium">{jobPost.title}</h2>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Company:</strong> {jobPost.company.name}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Location:</strong> {jobPost.location}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Employment Type:</strong> {jobPost.workplaceType}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Category:</strong> {jobPost.economiSector}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Number of Openings:</strong> {jobPost.openPositions}
						</p>
					</div>
					<div className="mb-4 h-30">
						<p className="text-sm font-medium">
							<strong>Date Posted:</strong> {formatDate(jobPost.createdAt)}
						</p>
					</div>
				</div>
			</div>
		</PageContent>
	);
};

export default JobDetailsPage;
