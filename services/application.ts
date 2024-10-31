
import httpClient from "./httpClient";

export const apply = async (data: { jobPostId: string }): Promise<any> => {
	const response = await httpClient.post("/applications", data);
	return response.data;
};

export const getAllApplications = async (): Promise<any[]> => {
	const response = await httpClient.get("/applications");
	return response.data.data;
};

export const getApplication = async (id: string): Promise<any> => {
	const response = await httpClient.get(`/applications/${id}`);
	return response.data.data;
};

export const hasApplied = async (jobPostId: string): Promise<boolean> => {
	const response = await httpClient.get(
		`/applications/hasApplied/${jobPostId}`,
	);
	return response.data.data.hasApplied;
};

export const isAcceptingApplications = async (
	jobId: string,
): Promise<boolean> => {
	const response = await httpClient.get(
		`/internership/${jobId}/is-accepting-applications`,
	);
	return response.data.data.isAcceptingApplications;
};

export const setAcceptingApply = async (
	jobId: string,
	isAcceptingApplications: boolean,
): Promise<any> => {
	const response = await httpClient.put(
		`/internership/${jobId}/set-accepting-applications`,
		{ isAcceptingApplications },
	);
	return response.data;
};

export const updateApplicationStatus = async (
	id: string,
	applicationStatus: string,
): Promise<any> => {
	const response = await httpClient.put(`/applications/${id}/status`, {
		applicationStatus,
	});
	return response.data;
};

export const getApprovedStudents = async (jobPostId: string): Promise<any> => {
	return (await httpClient.get(`/student/stud?jobId=${jobPostId}`)).data.data;
};

export const isShortlistedOrApproved = async (
	jobPostId: string,
): Promise<boolean> => {
	const response = await httpClient.get(`/applications/status/${jobPostId}`);
	return response.data.data.isShortlistedOrApproved;
};

export const approvedIntern = async (): Promise<any> => {
	const response = await httpClient.get("/student/approvedStudent");
	return response.data.data;
};
