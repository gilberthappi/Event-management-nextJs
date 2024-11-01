"use client";
// JobDetailsPage.tsx

import PageContent from "@/components/shared/PageContent";
import { Button } from "@/components/ui/button";
import { isShortlistedOrApproved } from "@/services/booking";
import { getJobPost } from "@/services/event";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

const JobDetailsPage: React.FC = () => {
	const { id } = useParams();
	const [canSeeOnBoardingRequirements, setCanSeeOnBoardingRequirements] =
		useState(false);

	const { data: jobPost, isLoading } = useQuery({
		queryKey: ["APPLICANT_JOB_POSTS", id],
		queryFn: () => getJobPost(id as string),
	});

	useEffect(() => {
		// const checkIfApplied = async () => {
		// 	if (jobPost) {
		// 		const applied = await hasApplied(id as string);
		// 		setHasAppliedToJob(applied);
		// 	}
		// };

		const checkStatus = async () => {
			if (jobPost) {
				const StudentStatus = await isShortlistedOrApproved(id as string);
				setCanSeeOnBoardingRequirements(StudentStatus);
			}
		};

		// checkIfApplied();
		checkStatus();
	}, [id, jobPost]);

	if (isLoading || !jobPost) return <p>Loading...</p>;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return format(date, "dd MMMM yyyy");
	};

	return (
		<PageContent>
			<Link href="/details">
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
								onBoarding Requirements
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
