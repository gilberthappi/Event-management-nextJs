"use client";
import PageContent from "@/components/shared/PageContent";
import Section from "@/components/shared/Section";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { CreateJobPostSchema } from "@/constants/jobPost.schema";
import { createJobPost, updateJobPost } from "@/services/jobPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import "react-quill/dist/quill.snow.css";
import { getSupervisors } from "@/services/companyStaff";
import type { IJobPost } from "@/types/index";
import type { IStaff } from "@/types/index";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const workplaceTypes = ["Onsite", "Remote", "Hybrid"];
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

type InternshipFormProps = {
	isLoading: boolean;
	isUpdate?: boolean;
	defaults?: Partial<IJobPost>;
};

export default function CreateInternshipForm({
	isLoading,
	isUpdate,
	defaults,
}: InternshipFormProps) {
	const { toast } = useToast();
	const queryClient = new QueryClient();
	const [formLoading, setFormLoading] = useState(false);

	const form = useForm<z.infer<typeof CreateJobPostSchema>>({
		resolver: zodResolver(CreateJobPostSchema),
		defaultValues: {
			title: defaults?.title || "",
			location: defaults?.location || "",
			workplaceType: defaults?.workplaceType || "",
			economiSector: defaults?.economiSector || "",
			description: defaults?.description || "",
			onBoardingRequirements: defaults?.onBoardingRequirements || "",
			applicationDeadline: defaults?.applicationDeadline || "",
			openPositions: defaults?.openPositions || "",
			supervisorId: defaults?.supervisorId || "",
		},
	});

	const { data: supervisors } = useQuery<IStaff[], Error>({
		queryKey: ["supervisors"],
		queryFn: getSupervisors,
	});

	const mutation = useMutation({
		mutationFn: (data: {
			title: string;
			location: string;
			workplaceType: string;
			economiSector: string;
			description: string;
			onBoardingRequirements: string;
			applicationDeadline: string;
			openPositions: string;
			supervisorId: string;
		}) =>
			isUpdate && defaults?.id
				? updateJobPost(defaults.id, data)
				: createJobPost(data),
		onSuccess: () => {
			toast({
				title: `Internship ${isUpdate ? "updated" : "created"}`,
				variant: "primary",
			});
			queryClient.invalidateQueries({ queryKey: ["INTERNSHIP"] });
			setFormLoading(false);
		},
		onError: () => {
			toast({
				title: `Failed to ${isUpdate ? "update" : "create"} Internship`,
				variant: "destructive",
			});
			setFormLoading(false);
		},
	});

	const onSubmit: SubmitHandler<z.infer<typeof CreateJobPostSchema>> = async (
		data,
	) => {
		setFormLoading(true);
		mutation.mutate({
			title: data.title,
			location: data.location,
			workplaceType: data.workplaceType,
			economiSector: data.economiSector,
			description: data.description,
			onBoardingRequirements: data.onBoardingRequirements,
			applicationDeadline: data.applicationDeadline || "",
			openPositions: data.openPositions,
			supervisorId: data.supervisorId,
		});
	};

	return (
		<PageContent>
			<div className="space-y-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold">
						{isUpdate ? "Update Internship" : "Create Internship"}
					</h1>
					<Link href="/internships">
						<Button variant="ghost">
							<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
						</Button>
					</Link>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<Section title="Internship Info">
							<div className="grid md:grid-cols-2 gap-6">
								<TextBox
									control={form.control}
									name="title"
									type="text"
									placeholder="Title"
									label="Title"
								/>
								<TextBox
									control={form.control}
									name="location"
									type="text"
									placeholder="Location"
									label="Location"
								/>
								<TextBox
									control={form.control}
									name="applicationDeadline"
									type="datetime-local"
									placeholder="Application Deadline"
									label="Application Deadline"
								/>
								<TextBox
									control={form.control}
									name="openPositions"
									type="text"
									placeholder="Open Positions"
									label="Open Positions"
								/>

								<FormField
									control={form.control}
									name="workplaceType"
									render={({ field }) => (
										<div>
											<FormLabel className="text-gray-500 text-xs">
												Workplace Type
											</FormLabel>
											<FormControl>
												<select
													{...field}
													className="w-full rounded-md border bg-background px-3 py-3 text-sm"
												>
													<option value="">select</option>
													{workplaceTypes.map((type) => (
														<option key={type} value={type.toLowerCase()}>
															{type}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</div>
									)}
								/>

								<FormField
									control={form.control}
									name="economiSector"
									render={({ field }) => (
										<div>
											<FormLabel className="text-gray-500 text-xs">
												Economic Sector
											</FormLabel>
											<FormControl>
												<select
													{...field}
													className="w-full rounded-md border bg-background px-3 py-3 text-sm"
												>
													<option value="">select</option>
													{economicSectors.map((sector) => (
														<option
															key={sector}
															value={sector.toLowerCase().replace(/ /g, "_")}
														>
															{sector}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</div>
									)}
								/>

								<FormField
									control={form.control}
									name="supervisorId"
									render={({ field }) => (
										<div>
											<FormLabel className="text-gray-500 text-xs">
												Supervisor
											</FormLabel>
											<FormControl>
												<select
													{...field}
													className="w-full rounded-md border bg-background px-3 py-3 text-sm"
												>
													<option value="">Select supervisor</option>
													{supervisors?.map((supervisor: IStaff) => (
														<option key={supervisor.id} value={supervisor.id}>
															{`${supervisor.firstName} ${supervisor.lastName}`}
														</option>
													))}
												</select>
											</FormControl>
											<FormMessage />
										</div>
									)}
								/>
							</div>
						</Section>

						<Section title="Description">
							<FormField
								control={form.control}
								name="description"
								render={() => (
									<div>
										<FormControl>
											<Controller
												name="description"
												control={form.control}
												render={({ field }) => (
													<div className="border rounded-lg overflow-hidden">
														<ReactQuill {...field} className="h-48" />
													</div>
												)}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</Section>

						<Section title="Onboarding Requirements">
							<FormField
								control={form.control}
								name="onBoardingRequirements"
								render={() => (
									<div>
										<FormControl>
											<Controller
												name="onBoardingRequirements"
												control={form.control}
												render={({ field }) => (
													<div className="border rounded-lg overflow-hidden">
														<ReactQuill {...field} className="h-48" />
													</div>
												)}
											/>
										</FormControl>
										<FormMessage />
									</div>
								)}
							/>
						</Section>

						<div className="text-right">
							<Button type="submit" disabled={isLoading || formLoading}>
								{isLoading || formLoading
									? isUpdate
										? "Updating..."
										: "Creating..."
									: isUpdate
										? "Update"
										: "Create"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</PageContent>
	);
}
