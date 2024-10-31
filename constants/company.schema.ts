import { z } from "zod";

const companyBaseSchema = {
	name: z.string({ required_error: "Name required" }).min(1),
	address: z.string().optional(),
	email: z.string({ required_error: "Email required" }).email(),
	phoneNumber: z.string().optional(),
};

const contactPersonSchema = {
	firstName: z.string({ required_error: "Name required" }).min(1),
	lastName: z.string({ required_error: "Name required" }).min(1),
	email: z.string().email(),
	phoneNumber: z.string().optional(),
};

export const CreateCompanySchema = z.object({
	company: z.object({
		...companyBaseSchema,
	}),
	contactPerson: z.object({
		...contactPersonSchema,
	}),
});

export const UpdateCompanySchema = z.object({
	company: z.object({
		...companyBaseSchema,
	}),
	contactPerson: z.object({
		...contactPersonSchema,
	}),
});
