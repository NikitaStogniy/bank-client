interface ButtonProps {
	label: String;
	type?: String;
	action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, type, action }) => {
	if (type) {
		return (
			<button
				type="submit"
				className="bg-[#51CC5D]/30 text-[#51CC5D] px-6 py-4 rounded-xl text-sm font-normal hover:bg-[#51CC5D]/60 duration-300 ease-in-out"
			>
				{label}
			</button>
		);
	}
	return (
		<button
			onClick={action}
			className="bg-[#51CC5D]/30 text-[#51CC5D] px-6 py-4 rounded-xl text-sm font-normal hover:bg-[#51CC5D]/60 duration-300 ease-in-out"
		>
			{label}
		</button>
	);
};

export default Button;
