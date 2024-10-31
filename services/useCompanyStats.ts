import {
	getApprovedStudentCountCompany,
	getCompanyStaffCount,
	getInternshipCountCompany,
} from "@/services/stats";
import { useEffect, useState } from "react";

export const useCompanyStats = (year: string) => {
	const [staffCountsByCompany, setStaffCountsByCompany] = useState<number[]>(
		[],
	);
	const [approvedStudentCountsByCompany, setApprovedStudentCountsByCompany] =
		useState<number[]>([]);
	const [internshipCountsByCompany, setInternshipCountsByCompany] = useState<
		number[]
	>([]);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedStaffCountsByCompany = await getCompanyStaffCount(year);
				const fetchedApprovedStudentCountsByCompany =
					await getApprovedStudentCountCompany(year);
				const fetchedInternshipCountsByCompany =
					await getInternshipCountCompany(year);

				setStaffCountsByCompany(fetchedStaffCountsByCompany);
				setApprovedStudentCountsByCompany(
					fetchedApprovedStudentCountsByCompany,
				);
				setInternshipCountsByCompany(fetchedInternshipCountsByCompany);
			} catch (error) {
				console.error("Error fetching company stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		staffCountsByCompany,
		approvedStudentCountsByCompany,
		internshipCountsByCompany,
	};
};
