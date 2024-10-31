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
import {
	CreateCompanySchema,
	UpdateCompanySchema,
} from "@/constants/company.schema";
import type { ICompanyFullInfo } from "@/constants/types";
import { createCompany, updateCompany } from "@/services/companies";
import type { ICreateCompanyValidationError } from "@/types";
import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import type React from "react";
import { type FC, useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { z } from "zod";

interface CompanyFormProps {
	isUpdate?: boolean;
	defaults?: ICompanyFullInfo;
	isLoading?: boolean;
}
const Roles = ["COMPANY_ADMIN"];

const CompanyForm: FC<CompanyFormProps> = (props) => {
	const formRef = useRef(null);
	const { toast } = useToast();
	const client = useQueryClient();

	const defaultValues = props.isUpdate
		? props.defaults
		: {
				company: {
					name: "",
					address: "",
					email: "",
					phoneNumber: "",
					economicSector: ["IT"],
					bankName: "",
					accountNumber: "",
					TIN: "",
					certificate: null as unknown as File,
					type: "",
				},
				contactPerson: {
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					title: "",
					role: "",
					idNumber: "",
					idAttachment: null as unknown as File,
				},
			};

	const formSchema = props.isUpdate ? UpdateCompanySchema : CreateCompanySchema;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	const mutation = useMutation({
		mutationFn: createCompany,
		onSuccess: () => {
			toast({
				title: "Company created",
				variant: "primary",
			});
			client.invalidateQueries({
				queryKey: ["COMPANIES"],
			});
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.data?.error === "validate") {
					error.response.data.data.map((err: ICreateCompanyValidationError) => {
						form.setError(err.field, {
							type: "manual",
							message: err.error,
						});
					});
				}
				toast({
					title: error.response?.data.message ?? "Failed to create company",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Failed to create company",
					variant: "destructive",
				});
			}
		},
	});
	const updateCompanyMutation = useMutation({
		mutationFn: (formData: FormData) =>
			updateCompany(formData, props.defaults?.company.id as string),
		onSuccess: () => {
			toast({
				title: "company Updated!",
				variant: "primary",
			});
			client.invalidateQueries({
				queryKey: ["COMPANIES"],
			});
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.data?.error === "validate") {
					error.response.data.data.map((err: ICreateCompanyValidationError) => {
						form.setError(err.field, {
							type: "manual",
							message: err.error,
						});
					});
				}
				toast({
					title: error.response?.data.message ?? "Failed to update company",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Failed to update company",
					variant: "destructive",
				});
			}
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		// @ts-ignore
		name: "company.economicSector",
	});
	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
		const formData = new FormData();
		formData.append("company[name]", data.company.name);
		formData.append("company[address]", data.company.address ?? "");
		formData.append("company[email]", data.company.email);
		formData.append("company[phoneNumber]", data.company.phoneNumber ?? "");
		formData.append("company[bankName]", data.company.bankName ?? "");
		formData.append("company[accountNumber]", data.company.accountNumber ?? "");
		formData.append("company[TIN]", data.company.TIN ?? "");
		formData.append("company[type]", data.company.type ?? "");
		data.company.economicSector.forEach((sector, index) => {
			formData.append(`company[economicSector][${index}]`, sector);
		});
		formData.append("company[certificate]", data.company.certificate);
		formData.append("contactPerson[firstName]", data.contactPerson.firstName);
		formData.append("contactPerson[lastName]", data.contactPerson.lastName);
		formData.append("contactPerson[email]", data.contactPerson.email);
		formData.append(
			"contactPerson[phoneNumber]",
			data.contactPerson.phoneNumber ?? "",
		);
		formData.append("contactPerson[title]", data.contactPerson.title ?? "");
		formData.append("contactPerson[role]", data.contactPerson.role);
		formData.append(
			"contactPerson[idNumber]",
			data.contactPerson.idNumber ?? "",
		);
		formData.append(
			"contactPerson[idAttachment]",
			data.contactPerson.idAttachment,
		);
		if (props.isUpdate && props.defaults) {
			formData.append("contactPerson[userId]", props.defaults.contactPerson.id);
			updateCompanyMutation.mutate(formData);
		} else {
			mutation.mutate(formData);
		}
	};

	const getCompanyCertificate = (e: React.ChangeEvent<HTMLInputElement>) => {
		form.setValue("company.certificate", e.target.files?.[0]);
	};

	const getIdAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
		form.setValue("contactPerson.idAttachment", e.target.files?.[0]);
	};

	return (
		<PageContent>
			<div className="space-y-4">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-xl font-semibold">
						{props.isUpdate ? "Update company Info" : "Add new company"}
					</h1>
					<Link href="/companies">
						<Button variant="ghost">
							<ArrowLeftIcon className="w-5 h-5 text-gray-700" />
						</Button>
					</Link>
				</div>
				{((props.isUpdate && props.defaults) || !props.isUpdate) && (
					<Form {...form}>
						<form
							ref={formRef}
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<Section title="Company Info">
								<div className="grid md:grid-cols-2 gap-4">
									<TextBox
										label="Company Name"
										type="text"
										name="company.name"
										placeholder="Company Inc"
										control={form.control}
									/>
									<TextBox
										label="Address"
										type="text"
										name="company.address"
										placeholder="Kicukiro, Kigali"
										control={form.control}
									/>
									<TextBox
										label="Email"
										type="email"
										name="company.email"
										placeholder="companyinc@gmail.com"
										control={form.control}
									/>
									<TextBox
										label="Phone"
										type="text"
										name="company.phoneNumber"
										placeholder="+250728858833"
										control={form.control}
									/>
									<TextBox
										label="Bank Name"
										type="text"
										name="company.bankName"
										placeholder="Equity"
										control={form.control}
									/>
									<TextBox
										label="Account Number"
										type="text"
										name="company.accountNumber"
										placeholder="4012345679"
										control={form.control}
									/>
									<TextBox
										label="TIN Number"
										type="text"
										name="company.TIN"
										placeholder="1293385716"
										control={form.control}
									/>
									<div className="relative">
										<TextBox
											onChange={getCompanyCertificate}
											placeholder="RDB / RGB certificates"
											label="Registration Certificate"
											type="file"
											name="company.certificate"
											control={form.control}
										/>
										{props.defaults && (
											<div className="absolute p-2 right-0 top-9">
												<Link
													target="_blank"
													href={props.defaults.company.certificateUrl}
												>
													<PaperClipIcon className="w-6 text-primary" />
												</Link>
											</div>
										)}
									</div>
									<TextBox
										label="Type"
										type="text"
										name="company.type"
										placeholder="Private"
										control={form.control}
									/>
								</div>
							</Section>
							<Section title="Sectors of operations">
								<div className="grid md:grid-cols-4 gap-4">
									{fields.map((field, idx) => (
										<div className="space-y-1 cursor-pointer" key={idx}>
											<TrashIcon
												onClick={() => remove(idx)}
												className="text-destructive w-4"
											/>
											<TextBox
												type="text"
												name={`company.economicSector.${idx}`}
												placeholder="1293385716"
												control={form.control}
											/>
										</div>
									))}
								</div>
								<div>
									<span
										className="p-1 text-primary text-xs font-semibold cursor-pointer"
										onClick={() => append("")}
									>
										Add sector of operations
									</span>
								</div>
								<div className="mt-1">
									<span className="text-xs text-destructive">
										{form.formState.errors.company?.economicSector && (
											<p>
												{
													form.formState.errors.company.economicSector.root
														?.message
												}
											</p>
										)}
									</span>
								</div>
							</Section>
							<Section title="Contact Person">
								<div className="grid md:grid-cols-2 gap-4">
									<TextBox
										label="First name"
										type="text"
										name="contactPerson.firstName"
										placeholder="John"
										control={form.control}
									/>
									<TextBox
										label="Last Name"
										type="text"
										name="contactPerson.lastName"
										placeholder="Doe"
										control={form.control}
									/>
									<TextBox
										label="Email"
										type="email"
										name="contactPerson.email"
										placeholder="johndoe@domain.df"
										control={form.control}
									/>
									<TextBox
										label="Phone"
										type="text"
										name="contactPerson.phoneNumber"
										placeholder="+250728858833"
										control={form.control}
									/>
									<TextBox
										label="Title"
										type="text"
										name="contactPerson.title"
										placeholder="Mr,Miss,Dr, etc .."
										control={form.control}
									/>
									<FormField
										control={form.control}
										name="contactPerson.role"
										render={({ field }) => (
											<div>
												<FormLabel className="text-gray-500 text-xs">
													Role
												</FormLabel>
												<FormControl>
													<select
														{...field}
														className="w-full rounded-md border bg-background px-3 py-3 text-sm"
													>
														<option value="">select</option>
														{Roles.map((type) => (
															<option key={type} value={type}>
																{type}
															</option>
														))}
													</select>
												</FormControl>
												<FormMessage />
											</div>
										)}
									/>
									<TextBox
										label="ID/Passport number"
										type="text"
										name="contactPerson.idNumber"
										placeholder="1293385716"
										control={form.control}
									/>
									<div className="relative">
										<TextBox
											label="ID/Passport attachment"
											onChange={getIdAttachment}
											type="file"
											name="contactPerson.idAttachment"
											placeholder="1293385716"
											control={form.control}
										/>
										{props.defaults && (
											<div className="absolute p-2 right-0 top-9">
												<Link
													target="_blank"
													href={props.defaults.contactPerson.idAttachmentUrl}
												>
													<PaperClipIcon className="w-6 text-primary" />
												</Link>
											</div>
										)}
									</div>
								</div>
							</Section>
							<div>
								<Button
									disabled={
										mutation.isPending || updateCompanyMutation.isPending
									}
									type="submit"
								>
									{mutation.isPending ? "Saving ..." : "Save company"}
								</Button>
							</div>
						</form>
					</Form>
				)}
			</div>
		</PageContent>
	);
};
export default CompanyForm;
