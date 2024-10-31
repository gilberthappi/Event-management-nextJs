"use client";
import TextBox from "@/components/ui/TextBox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { StaffSchema as staffSchema } from "@/lib/schema/staffSchema";
import type { ISignInResponse } from "@/services/auth";
import httpClient from "@/services/httpClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export const AddStaffMember = ({ id }: { id: string }) => {
	const [isAddingMember, setIsAddingMember] = useState(false);
	const { data } = useSession();
	const form = useForm<z.infer<typeof staffSchema>>({
		resolver: zodResolver(staffSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
		},
	});
	const client = useQueryClient();

	const { mutate: addNewMemberMutation, isPending } = useMutation({
		mutationKey: ["addStaffMember"],
		mutationFn: (data: z.infer<typeof staffSchema>) =>
			httpClient.put(`/company/${id}/staff`, data),
		onSuccess: () => {
			client.invalidateQueries({
				queryKey: ["COMPANY_STAFF"],
			});
		},

		onError: (error) => {
			if (error instanceof AxiosError) {
				if (error.response?.data?.error === "validate") {
					error.response.data.data.map((err: any) => {
						form.setError(err.field, {
							type: "manual",
							message: err.error,
						});
					});
				}
				toast({
					title:
						error.response?.data.message ??
						"Failed to add new company staff member",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Failed to add new company staff member",
					variant: "destructive",
				});
			}
		},
	});

	const addnewmember = (e: z.infer<typeof staffSchema>) => {
		addNewMemberMutation(e);
	};

	return (
		<>
			{isAddingMember ? (
				<>
					<h1 className="text-2xl font-bold mb-4">Add Staff Member</h1>
					<Form {...form}>
						<form
							className="space-y-2 w-full"
							onSubmit={form.handleSubmit(addnewmember)}
						>
							<TextBox
								label="Email"
								type="text"
								name="email"
								placeholder="Email"
								control={form.control}
							/>
							<TextBox
								label="Password"
								type="text"
								name="password"
								placeholder="Password"
								control={form.control}
							/>
							<TextBox
								label="firstName"
								type="text"
								name="firstName"
								placeholder="First name"
								control={form.control}
							/>
							<TextBox
								label="lastName"
								type="text"
								name="lastName"
								placeholder="lastName"
								control={form.control}
							/>
							<input
								type="hidden"
								name="token"
								defaultValue={(data?.user as ISignInResponse)?.token}
							/>
							<input type="hidden" name="id" defaultValue={id} />
							<Button
								disabled={!!form.formState.errors.email || isPending}
								type="submit"
							>
								{!isPending
									? "add new company staff member"
									: "adding new company staff member..."}
							</Button>
						</form>
					</Form>
				</>
			) : (
				<Button onClick={() => setIsAddingMember(!isAddingMember)}>
					Add Staff Member
				</Button>
			)}
		</>
	);
};
