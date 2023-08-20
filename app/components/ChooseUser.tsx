"use client";

import { FC, useEffect, useState } from "react";

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface ChooseUserProps {
	reload: number;
	setReload: React.Dispatch<React.SetStateAction<number>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ChooseUser: React.FC<ChooseUserProps> = ({
	setUser,
	reload,
	setReload,
}) => {
	const [users, setUsers] = useState<User[]>([]);

	const handleClick = (user: User) => {
		setUser(user);
		setReload(reload + 1);
	};

	useEffect(() => {
		fetch(
			"https://api.retool.com/v1/workflows/81d2c9cc-b5db-4585-87f6-46f2b5abf21e/startTrigger?workflowApiKey=retool_wk_a66001c2128c4f5ea9f8f0250fa0f7aa"
		)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	}, [reload]);

	return (
		<div className="flex flex-col justify-center align-center items-center w-full h-[100vh] gap-8">
			<h1 className="text-3xl font-bold text-gray-300">Choose user</h1>
			{users.length > 1 ? (
				<div className="flex flex-col overflow-scroll max-h-[300px] max-w-[400px] pr-4">
					{users.map((user) => (
						<div
							onClick={() => handleClick(user)}
							key={user.id}
							className="p-4 cursor-pointer hover:bg-gray-100 duration-300 ease-in-out rounded-xl w-full"
						>
							<h2 className="text-xl font-bold">{user.name}</h2>
							<p>Debt: ${user.debt}</p>
							<p>Phone: {user.phone}</p>
							<p>Email: {user.email}</p>
						</div>
					))}
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default ChooseUser;
