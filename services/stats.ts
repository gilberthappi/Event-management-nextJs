// /home/happi/Project/ims-fe/services/stats.ts
import httpClient from "./httpClient";

export const getSchoolsCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/schools/school/count-by-month/${year}`)).data
		.data;
};

export const getCompanieCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/company/school/count-by-month/${year}`)).data
		.data;
};

export const getStudentCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/student/student/count-by-month/${year}`)).data
		.data;
};

export const getStudentCountBySchool = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/student/count-by-school/school/${year}`)).data
		.data;
};
export const getSInternCountBySchool = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/student/approvedStudentSchool/school/${year}`))
		.data.data;
};
export const getStaffCountBySchool = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/student/staff/school/${year}`)).data.data;
};
export const getCompanyStaffCount = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/staff/company/company/${year}`)).data.data;
};
export const getApprovedStudentCountCompany = async (
	year: string,
): Promise<any[]> => {
	return (
		await httpClient.get(
			`/student/company/approvedStudentCompany/company/${year}`,
		)
	).data.data;
};
export const getInternshipCountCompany = async (
	year: string,
): Promise<any[]> => {
	return (await httpClient.get(`/internership/jobPost/company/${year}`)).data
		.data;
};

export const getInternshipCountSupervisor = async (
	year: string,
): Promise<any[]> => {
	return (await httpClient.get(`/internership/jobPost/supervisor/${year}`)).data
		.data;
};

export const getTaskCountSupervisor = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/tasks/task/supervisor/${year}`)).data.data;
};

export const getApprovedStudentCountSupervisor = async (
	year: string,
): Promise<any[]> => {
	return (
		await httpClient.get(
			`/student/supervisor/approvedStudentCompany/supervisor/${year}`,
		)
	).data.data;
};

export const getTaskCountStudent = async (year: string): Promise<any[]> => {
	return (await httpClient.get(`/tasks/task/student/${year}`)).data.data;
};

export const getApplicationCountStudent = async (
	year: string,
): Promise<any[]> => {
	return (await httpClient.get(`/applications/applied/student/${year}`)).data
		.data;
};

export const getApplicationApprovedCountStudent = async (
	year: string,
): Promise<any[]> => {
	return (
		await httpClient.get(`/applications/application/approved/student/${year}`)
	).data.data;
};
