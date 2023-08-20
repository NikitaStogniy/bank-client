"use client";
import { useContext } from "react";
import { MyContext } from "../context/context";

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface ChooseUserProps {
	userContext: User;
}

const GoodTime: React.FC<ChooseUserProps> = ({ userContext }) => {
	let time = "morning";
	const now = new Date().getHours();
	if (now < 12) {
		time = "morning";
	} else if (now >= 12) {
		time = "afternoon";
	} else if (now >= 18) {
		time = "evening";
	} else if (now >= 22) {
		time = "night";
	}
	return (
		<div>
			Good {time}, <span className="text-gray-600">{userContext.name}</span>
		</div>
	);
};

export default GoodTime;
