import {
	getCompanieCount,
	getSchoolsCount,
	getStudentCount,
} from "@/services/stats";
import { useEffect, useState } from "react";

export const useAdminStats = (year: string) => {
	const [schoolCounts, setSchoolCounts] = useState<number[]>([]);
	const [companyCounts, setCompanyCounts] = useState<number[]>([]);
	const [studentCounts, setStudentCounts] = useState<number[]>([]);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const fetchedSchoolCounts = await getSchoolsCount(year);
				const fetchedCompanyCounts = await getCompanieCount(year);
				const fetchedStudentCounts = await getStudentCount(year);

				setSchoolCounts(fetchedSchoolCounts);
				setCompanyCounts(fetchedCompanyCounts);
				setStudentCounts(fetchedStudentCounts);
			} catch (error) {
				console.error("Error fetching admin stats", error);
			}
		};

		fetchStats();
	}, [year]);

	return {
		schoolCounts,
		companyCounts,
		studentCounts,
	};
};
