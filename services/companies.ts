import type { ICompany } from "./../types/index";
import httpClient from "./httpClient";

export const createCompany = async (data: FormData): Promise<ICompany> => {
	return (await httpClient.post("/company", data)).data;
};

export const getAllCompanies = async (): Promise<ICompany[]> => {
	return (await httpClient.get("/company")).data.data;
};

export const getCompany = async (id: string): Promise<ICompany> => {
	return (await httpClient.get(`/company/${id}`)).data.data;
};

export const updateCompany = async (
	data: FormData,
	id: string,
): Promise<ICompany> => {
	return (await httpClient.put(`/company/${id}`, data)).data;
};
