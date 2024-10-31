import React from "react";
import Typography from "../typography/Typography";

const Footer = () => {
	return (
		<footer className="bg-black py-5 px-3">
			<div className="mt-5 text-white text-center">
				<Typography variant="h6" className="font-bold">
					Contact Us:
				</Typography>
				<p>Kigali - Rwanda</p>
				<p>Phone: +250 784600762</p>
				<p>
					Email:{" "}
					<a
						href="mailto:gdushimimana6@gmail.com"
						className="text-green-500 underline"
					>
						gdushimimana6@gmail.com
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
