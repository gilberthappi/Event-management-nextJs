/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/components/Header/Header";
import React, { useEffect, useRef, useState } from "react";
import {
	FaBriefcase,
	FaChartLine,
	FaFacebookF,
	FaHandshake,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaUserTie,
	FaWhatsapp,
} from "react-icons/fa";

const LandingPage = () => {
	const videoRef = useRef<HTMLVideoElement>(null); // Ref to the video element
	const [isHomeInView, setIsHomeInView] = useState(false); // State to track if home section is in view

	useEffect(() => {
		const homeSection = document.getElementById("home");

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsHomeInView(true); // Home section is in view
					} else {
						setIsHomeInView(false); // Home section is out of view
					}
				});
			},
			{ threshold: 0.5 }, // Trigger when 50% of the home section is in view
		);

		if (homeSection) {
			observer.observe(homeSection);
		}

		return () => {
			if (homeSection) {
				observer.unobserve(homeSection);
			}
		};
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			if (isHomeInView) {
				console.log("Playing video"); // Debug log
				videoRef.current.play(); // Play video when home section is in view
			} else {
				console.log("Pausing video"); // Debug log
				videoRef.current.pause(); // Pause video when home section is not in view
			}
		}
	}, [isHomeInView]);

	return (
		<div className="relative w-full h-screen">
			{/* Header */}
			<Header />

			{/* Home Section */}
			<section
				id="home"
				className="w-full h-screen flex justify-center items-center relative bg-black bg-opacity-70"
			>
				{/* Background Video */}
				<video
					ref={videoRef}
					loop
					muted
					className="absolute inset-0 w-full h-full object-cover -z-10"
				>
					<source src="/video.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				<div className="justify-center items-start text-left p-4 pl-6 sm:pl-10 md:pl-20 relative z-10">
					<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 text-white">
						Welcome to <span className="text-[#840c0c]">NGIRO</span> Internship
					</h1>
					<h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white">
						Management Software
					</h2>
					<p className="text-white text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8">
						Transform your internship program with intuitive software that makes
						career moves possible.
					</p>
					<a
						href="/auth/signin"
						className="text-white bg-[#840c0c] px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-lg"
					>
						Login
					</a>
				</div>
			</section>

			{/* About1 Section */}
			<section
				id="about"
				className="w-full h-auto flex bg-[#281c44] p-10 sm:p-16 md:p-20"
			>
				<div className="bg-[#100c34] p-6 sm:p-8 rounded-lg w-full max-w-7xl mx-auto">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white text-center">
						Challenges Faced by TVET Schools
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-base sm:text-lg text-white">
						{/* Left Column */}
						<div className="flex items-start space-x-4">
							{/* Number */}
							<span className="bg-[#281c44] rounded-lg w-12 h-12 flex items-center justify-center text-xl font-medium mr-4">
								1
							</span>

							{/* Title and Paragraph vertically stacked */}
							<div className="flex flex-col">
								<h4 className="text-xl font-medium mb-4">
									Limited Industry Connections
								</h4>
								<p>
									Many TVET schools struggle to connect with companies offering
									internships. This hinders their ability to secure placements
									for all students.
								</p>
							</div>
						</div>

						{/* Center Column */}
						<div className="flex items-start space-x-4">
							{/* Number */}
							<span className="bg-[#281c44] rounded-lg w-12 h-12 flex items-center justify-center text-xl font-medium mr-4">
								2
							</span>

							{/* Title and Paragraph vertically stacked */}
							<div className="flex flex-col">
								<h4 className="text-xl font-medium mb-4">
									Administrative Burden
								</h4>
								<p>
									Managing internships, tracking placements, coordinating with
									students and employers, and handling paperwork can be
									time-consuming and complex.
								</p>
							</div>
						</div>

						{/* Right Column */}
						<div className="flex items-start space-x-4">
							{/* Number */}
							<span className="bg-[#281c44] rounded-lg w-12 h-12 flex items-center justify-center text-xl font-medium mr-4">
								3
							</span>

							{/* Title and Paragraph vertically stacked */}
							<div className="flex flex-col">
								<h4 className="text-xl font-medium mb-4">
									Tracking and Reporting
								</h4>
								<p>
									Monitoring student progress, attendance, and skill development
									during internships can be challenging without a centralized
									system for tracking and reporting.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* About2 Section */}
			<section
				id="about2"
				className="w-full h-auto flex bg-[#840c0c] p-10 sm:p-16 md:p-20"
			>
				<div className="w-full max-w-7xl mx-auto">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white text-center">
						Challenges for Enterprises
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-base sm:text-lg text-white">
						{/* Left Column */}
						<div className="flex-1 ml-0 sm:ml-10">
							<h3 className="text-xl font-medium mb-4">
								Difficulty in Attracting Interns
							</h3>
							<p>
								Enterprises face challenges attracting interns due to location,
								perceived lack of opportunities, or competition from larger
								companies. This can be addressed by highlighting the value and
								benefits of the internship program.
							</p>
						</div>

						{/* Center Column */}
						<div className="flex-1 ml-0 sm:ml-10">
							<h3 className="text-xl font-medium mb-4">
								Administrative Burden
							</h3>
							<p>
								Managing internships can be administratively demanding,
								diverting focus from core business activities. Streamlined
								processes and efficient tools can alleviate this burden.
							</p>
						</div>

						{/* Right Column */}
						<div className="flex-1 ml-0 sm:ml-10">
							<h3 className="text-xl font-medium mb-4">
								Lack of Clear Guidelines and Communication
							</h3>
							<p>
								Enterprises require clear guidelines and communication from TVET
								schools on internship objectives, outcomes, and evaluation
								criteria to ensure aligned expectations.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* Service Section */}
			<section
				id="service"
				className="w-full h-auto flex justify-center items-center bg-cover bg-center p-10 sm:p-16 md:p-20"
				style={{
					backgroundImage: "url(/service1.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="w-full max-w-7xl bg-[#00000080] p-6 sm:p-8 md:p-10 rounded-lg mx-auto">
					<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white text-center">
						Addressing Student Needs
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base sm:text-lg text-white">
						{/* Left Column */}
						<div className="bg-[#281c44] p-6 rounded-lg">
							<h3 className="text-lg sm:text-xl font-medium mb-4">
								Application and Integration into the Workplace
							</h3>
							<p>
								Interns may feel isolated and disconnected due to a lack of
								onboarding and inclusion. A sense of belonging can positively
								impact their experience.
							</p>
						</div>

						{/* Center Column */}
						<div className="bg-[#281c44] p-6 rounded-lg">
							<h3 className="text-lg sm:text-xl font-medium mb-4">
								Development Opportunities
							</h3>
							<p>
								Internships should provide meaningful tasks aligned with the
								interns field of study and career goals, promoting relevant
								skill development.
							</p>
						</div>

						{/* Right Column */}
						<div className="bg-[#281c44] p-6 rounded-lg">
							<h3 className="text-lg sm:text-xl font-medium mb-4">
								Networking Opportunities
							</h3>
							<p>
								Internship programs should encourage networking with
								professionals to build relationships, gain career insights, and
								explore potential career paths.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section
				id="benefit"
				className="w-full min-h-screen flex justify-center items-center  bg-[#100c34] bg-cover bg-center relative p-10 sm:p-20"
			>
				<div className="w-full max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center">
						Benefits for TVET Schools
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-white relative">
						{/* Numbered Arrow - Left */}
						<div className="flex-1 ml-0 sm:ml-20 mt-10">
							<div className="arrow-container flex items-center justify-center mb-4">
								<img src="/arrow1.png" alt="Arrow" className="arrow-image" />
							</div>
							<h3 className="text-xl font-medium mb-4 text-start">
								Streamlined Operations
							</h3>
							<p className="text-start">
								Simplify administrative tasks, automate processes, and save time
								and resources.
							</p>
						</div>

						{/* Numbered Arrow - Center */}
						<div className="flex-1 ml-0 sm:ml-20 mt-10">
							<div className="arrow-container flex items-center justify-center mb-4">
								<img src="/arrow2.png" alt="Arrow" className="arrow-image" />
							</div>
							<h3 className="text-xl font-medium mb-4 text-start">
								Improved Internship Placement Rates
							</h3>
							<p className="text-start">
								Increase placement opportunities for students by connecting with
								a wider pool of potential employers.
							</p>
						</div>

						{/* Numbered Arrow - Right */}
						<div className="flex-1 ml-0 sm:ml-20 mt-10">
							<div className="arrow-container flex items-center justify-center mb-4">
								<img src="/arrow3.png" alt="Arrow" className="arrow-image" />
							</div>
							<h3 className="text-xl font-medium mb-4 text-start">
								Enhanced Student Success
							</h3>
							<p className="text-start">
								Track student progress, provide relevant support, and ensure
								students gain valuable experience and skills.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Custom CSS for Professional Arrow */}
			<style jsx>{`
    .arrow-image {
    width: 300px; /* Adjust as needed */
    height: auto;
  }
`}</style>

			{/* Empowering Enterprises Section */}
			<section
				id="empowering"
				className="w-full min-h-screen flex justify-center items-center bg-cover bg-center relative p-10 sm:p-20"
				style={{
					backgroundImage: "url(/kigali.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				{/* Overlay to darken the background */}
				<div className="absolute inset-0 bg-black opacity-70" />

				{/* Content */}
				<div className="relative w-full max-w-7xl mx-auto p-6 sm:p-8 rounded-lg z-10">
					<h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-start">
						Empowering Enterprises
					</h2>
					<div className="space-y-3">
						<details className="rounded-md p-2">
							<summary className="cursor-pointer text-white text-lg font-semibold">
								Simplified Internship Management
							</summary>
							<p className="mt-2 text-white ml-4 sm:ml-8">
								Streamline onboarding, track progress, evaluate performance, and
								generate reports efficiently.
							</p>
						</details>
						<details className="rounded-md p-2">
							<summary className="cursor-pointer text-white text-lg font-semibold">
								Enhanced Talent Acquisition
							</summary>
							<p className="mt-2 text-white ml-4 sm:ml-8">
								Attract qualified candidates from a diverse pool of students,
								creating a pipeline of future talent.
							</p>
						</details>
						<details className="rounded-md p-2">
							<summary className="cursor-pointer text-white text-lg font-semibold">
								Improved Corporate Social Responsibility
							</summary>
							<p className="mt-2 text-white ml-4 sm:ml-8">
								Demonstrate commitment to education and skills development,
								fostering a positive image and attracting talent.
							</p>
						</details>
					</div>
				</div>
			</section>

			{/* Key Feature Section */}
			<section
				id="key-features"
				className="w-full min-h-screen bg-[#100c34] p-6 md:p-10"
			>
				<div className="w-full max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white text-center">
						Key Features of NGIRO
					</h2>

					{/* Responsive Feature Grid */}
					<div className="grid grid-cols-1 gap-6 rounded-md shadow-md border border-white">
						{/* Feature Row 1 */}
						<div className="flex flex-col sm:flex-row p-4 bg-[#100c34]">
							<div className="w-full sm:w-1/3 text-white text-lg sm:text-xl font-medium">
								Internship Management (Interns, School, and Enterprise)
							</div>
							<div className="w-full sm:w-2/3 text-white text-base sm:text-lg">
								<p>
									Profiles, applications, placements, progress tracking,
									performance evaluations, internship postings, matching
									students with suitable internships, and coordinating
									schedules.
								</p>
							</div>
						</div>

						{/* Feature Row 2 */}
						<div className="flex flex-col sm:flex-row p-4 bg-[#281c44]">
							<div className="w-full sm:w-1/3 text-white text-lg sm:text-xl font-medium">
								Skill Development
							</div>
							<div className="w-full sm:w-2/3 text-white text-base sm:text-lg">
								<p>
									Tools for tracking skill development, providing learning
									resources, and facilitating skill-based assessments.
								</p>
							</div>
						</div>

						{/* Feature Row 3 */}
						<div className="flex flex-col sm:flex-row p-4 bg-[#100c34]">
							<div className="w-full sm:w-1/3 text-white text-lg sm:text-xl font-medium">
								Communication and Collaboration
							</div>
							<div className="w-full sm:w-2/3 text-white text-base sm:text-lg">
								<p>
									Real-time communication channels for students, employers, and
									administrators, ensuring seamless collaboration.
								</p>
							</div>
						</div>

						{/* Feature Row 4 */}
						<div className="flex flex-col sm:flex-row p-4 bg-[#281c44]">
							<div className="w-full sm:w-1/3 text-white text-lg sm:text-xl font-medium">
								Reporting and Analytics
							</div>
							<div className="w-full sm:w-2/3 text-white text-base sm:text-lg">
								<p>
									Comprehensive reports (Digital Logbook) and data analysis to
									track program effectiveness, identify trends, and make
									informed decisions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Partner Section */}
			<section
				id="partner"
				className="w-full min-h-screen flex justify-center items-center  bg-[#281c44] bg-cover bg-center relative p-10 sm:p-20"
			>
				<div className="w-full max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold mb-20 text-white text-center">
						Shaping Tomorrow Through Empowered Education.
					</h2>

					{/* Responsive Partner Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-lg text-white mt-6">
						{/* Increased Employability */}
						<div className="flex flex-col items-start space-y-4">
							<FaBriefcase size="50" className="text-[#840c0c] mb-2" />
							<h4 className="text-xl font-medium">Increased Employability</h4>
							<p>
								Students gain practical experience, develop in-demand skills,
								and enhance their career prospects.
							</p>
						</div>

						{/* Stronger Industry Partnerships */}
						<div className="flex flex-col items-start space-y-4">
							<FaHandshake size="50" className="text-[#840c0c] mb-2" />
							<h4 className="text-xl font-medium">
								Stronger Industry Partnerships
							</h4>
							<p>
								Foster mutually beneficial relationships between TVET schools
								and enterprises, bridging the gap between education and
								industry.
							</p>
						</div>

						{/* Economic Development */}
						<div className="flex flex-col items-start space-y-4">
							<FaChartLine size="50" className="text-[#840c0c] mb-2" />
							<h4 className="text-xl font-medium">Economic Development</h4>
							<p>
								Contribute to a skilled workforce, drive innovation, and support
								economic growth.
							</p>
						</div>

						{/* A More Skilled Workforce */}
						<div className="flex flex-col items-start space-y-4">
							<FaUserTie size="50" className="text-[#840c0c] mb-2" />
							<h4 className="text-xl font-medium">A More Skilled Workforce</h4>
							<p>
								Promote a skilled and qualified workforce that meets the
								evolving needs of the industry.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Partner2 Section */}
			<section id="partner1" className="w-full min-h-[220px] bg-[#100c34] p-6">
				<div className="w-full max-w-7xl mx-auto flex flex-col items-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white text-center">
						Our Partners
					</h2>
					<div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
						{/* Partner Logos */}
						<div className="flex justify-center items-center">
							<img
								src="/logo1.png"
								alt="Partner 1"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
						<div className="flex justify-center items-center">
							<img
								src="/logo2.png"
								alt="Partner 2"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
						<div className="flex justify-center items-center">
							<img
								src="/logo3.jpeg"
								alt="Partner 3"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
						<div className="flex justify-center items-center">
							<img
								src="/logo4.jpeg"
								alt="Partner 4"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
						<div className="flex justify-center items-center">
							<img
								src="/logo5.png"
								alt="Partner 5"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
						<div className="flex justify-center items-center">
							<img
								src="/logo6.png"
								alt="Partner 6"
								className="h-12 md:h-16 object-contain"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			{/* Contact Section */}
			<section id="contact" className="w-full flex bg-[#281c44] p-4 md:p-8">
				<div className="w-full max-w-7xl mx-auto">
					<h2 className="text-2xl md:text-4xl font-bold mb-6 text-white text-center">
						Contact Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-white">
						{/* Left Column */}
						<div className="flex flex-col space-y-4">
							<p className="text-xl font-regular mb-1">
								Address: <span>KN 3 Ave, 30 St Kigali - Rwanda</span>
							</p>
							<p className="text-xl font-regular mb-1">
								Phone: <span>+250 788 20 86 93</span>
							</p>
							<p className="text-xl font-regular mb-1">
								Email:{" "}
								<span>
									<a
										href="mailto:info@digitalfactory.rw"
										className="hover:underline"
									>
										info@digitalfactory.rw
									</a>
								</span>
							</p>
						</div>

						{/* Center Column */}
						<div className="flex flex-col space-y-4">
							<h4 className="text-xl font-medium mb-4">Copyright</h4>
							<p>
								&copy; {new Date().getFullYear()} NGIRO Internship Management.
								<br /> All rights reserved.
							</p>
						</div>

						{/* Right Column */}
						<div className="flex flex-col space-y-4">
							<h4 className="text-xl font-medium mb-4">Follow Us</h4>
							<div className="flex space-x-4">
								<a
									href="https://twitter.com/digitalfactoryrw"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white"
								>
									<FaTwitter size={24} />
								</a>
								<a
									href="https://facebook.com/digitalfactoryrw"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white"
								>
									<FaFacebookF size={24} />
								</a>
								<a
									href="https://linkedin.com/company/digitalfactoryrw"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white"
								>
									<FaLinkedinIn size={24} />
								</a>
								<a
									href="https://instagram.com/digitalfactoryrw"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white"
								>
									<FaInstagram size={24} />
								</a>
								<a
									href="https://wa.me/+250788208693"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-white"
								>
									<FaWhatsapp size={24} />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
