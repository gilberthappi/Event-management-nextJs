import type { IJobPost } from "@/types/index";
import httpClient from "./httpClient";

export const createJobPost = async (data: {
	title: string;
	location: string;
	workplaceType: string;
	economiSector: string;
	description: string;
	onBoardingRequirements: string;
	applicationDeadline: string;
	openPositions: string;
	supervisorId: string;
}): Promise<IJobPost> => {
	return (await httpClient.post("/internership", data)).data.data;
};

export const getAllJobPosts = async (): Promise<IJobPost[]> => {
	const response = await httpClient.get("/internership");
	return response.data.data;
};

export const getAllMyJobPosts = async (): Promise<IJobPost[]> => {
	const response = await httpClient.get("/internership/my");
	return response.data.data;
};

export const getAllSupervisorJobPosts = async (): Promise<IJobPost[]> => {
	const response = await httpClient.get("/internership/supervisor/current");
	return response.data.data;
};

export const getJobPost = async (id: string): Promise<IJobPost> => {
	const response = await httpClient.get(`/internership/${id}`);
	return response.data.data;
};

export const updateJobPost = async (
	id: string,
	data: Partial<IJobPost>,
): Promise<IJobPost> => {
	const response = await httpClient.put(`/internership/${id}`, data);
	return response.data.data;
};

export const deleteJobPost = async (id: string): Promise<void> => {
	await httpClient.delete(`/internership/${id}`);
};
