import { useContext } from "react";
import { MyContext } from "../context/context";

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface UserProfileProps {
	reload: number;
	userContext: User;
	setReload: React.Dispatch<React.SetStateAction<number>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserProfile: React.FC<UserProfileProps> = ({
	setUser,
	reload,
	userContext,
	setReload,
}) => {
	const handleClick = () => {
		setUser(undefined);
		setReload(reload + 1);
	};
	return (
		<>
			{userContext ? (
				<div className="flex flex-row justify-end align-center items-center gap-4">
					<div className="h-[64px] w-[64px] bg-gray-100 rounded-xl flex justify-center align-center items-center text-3xl text-gray-300">
						{userContext.name.charAt(0)}
					</div>
					<div className="flex flex-col">
						<div className="text-xl font-bold text-gray-400">
							{userContext.name}
						</div>
						<div className="text-lg text-gray-400">{userContext.email}</div>
					</div>
					<div onClick={handleClick} className="cursor-pointer">
						<svg
							width="40"
							height="40"
							viewBox="0 0 24 24"
							stroke="#cccccc"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 4.49999H8C5.643 4.49999 4.464 4.49999 3.732 5.23199C3 5.96399 3 7.14299 3 9.49999V14.5C3 16.857 3 18.035 3.732 18.768C4.464 19.5 5.643 19.5 8 19.5H9M9 6.47599C9 4.18299 9 3.03599 9.707 2.40899C10.414 1.78199 11.495 1.96999 13.657 2.34699L15.987 2.75399C18.381 3.17099 19.578 3.37999 20.289 4.25799C21 5.13699 21 6.40699 21 8.94799V15.053C21 17.593 21 18.863 20.29 19.742C19.578 20.62 18.38 20.829 15.986 21.247L13.658 21.653C11.496 22.03 10.415 22.218 9.708 21.591C9 20.964 9 19.817 9 17.524V6.47599Z"
								strokeWidth="1.5"
							/>
							<path d="M12 11V13" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default UserProfile;
