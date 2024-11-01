"use client";
import JobCard from "@/components/events/JobCardCopy";
import PageContent from "@/components/shared/PageContent";
import { getAllJobPosts } from "@/services/event";
import type { IJobPost } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";

const economicSectors = [
	"Agriculture",
	"Construction",
	"Manufacturing",
	"ICT",
	"Tourism and Hospitality",
	"Business and Finance",
	"Automotive",
	"Energy",
	"Mining",
	"Healthcare",
	"Education",
];

const ApplicationPage: React.FC = () => {
	const [selectedSector, setSelectedSector] = useState<string>("");
	const { data: jobPosts, isLoading } = useQuery({
		queryKey: ["APPLICANT_JOB_POSTS"],
		queryFn: getAllJobPosts,
	});

	const filteredJobPosts = selectedSector
		? jobPosts?.filter(
				(jobPost: IJobPost) =>
					jobPost.economiSector.toLowerCase() === selectedSector.toLowerCase(),
			)
		: jobPosts;

	return (
		<PageContent>
			<h1 className="text-2xl font-bold mb-4">Available Internships</h1>

			<div className="mb-4">
				<label
					htmlFor="sector"
					className="block text-sm font-medium text-gray-700"
				/>
				<select
					id="sector"
					name="sector"
					className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
					value={selectedSector}
					onChange={(e) => setSelectedSector(e.target.value)}
				>
					<option value="">All Sectors</option>
					{economicSectors.map((sector) => (
						<option key={sector} value={sector}>
							{sector}
						</option>
					))}
				</select>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{isLoading ? (
					<p>Loading...</p>
				) : filteredJobPosts && filteredJobPosts.length > 0 ? (
					filteredJobPosts.map((jobPost: IJobPost) => (
						<div key={jobPost.id}>
							<JobCard jobPost={jobPost} />
						</div>
					))
				) : (
					<p>No job posts available.</p>
				)}
			</div>
		</PageContent>
	);
};

export default ApplicationPage;
