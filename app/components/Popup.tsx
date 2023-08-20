import { useState } from "react";
import Button from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	email: string;
	value: number;
	card: number;
	year: number;
	cvv: number;
};

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface PopupProps {
	reload: number;
	promiseValue: number;
	userContext: User;
	setReload: React.Dispatch<React.SetStateAction<number>>;
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<PopupProps> = ({
	setUser,
	reload,
	promiseValue,
	userContext,
	setReload,
	open,
	setOpen,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const handleClick = () => {
		setOpen(false);
	};

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		if (data.value > userContext.debt) {
			alert("Alert");
		} else {
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				user_id: userContext.id,
				date: new Date(),
				value: data.value,
			});

			fetch(
				"https://api.retool.com/v1/workflows/a115f517-ee60-414f-9fcd-bbb7ca36b791/startTrigger?workflowApiKey=retool_wk_9fd7626fe0ca4c8b82fffd869959477c",
				{ method: "POST", headers: myHeaders, body: raw, redirect: "follow" }
			)
				.then((response) => response.text())
				.then((result) => {
					setReload(reload + 1);
					setOpen(false);
				})
				.catch((error) => console.log("error", error));
		}
	};

	return (
		<div className="fixed w-full h-[100vh] bg-white/30 flex backdrop-blur-md">
			<div className="bg-white rounded-xl w-fit flex flex-col p-4 max-w-[400px] m-auto drop-shadow-xl">
				<div className="flex justify-end align-end">
					<Button action={handleClick} label={"x"} />
				</div>
				<h1 className="text-4xl text-gray-200 font-bold">MyBank {open}</h1>
				<p className="text-gray-300 my-4">
					Thank you for choosing MyBank as a partner! We would appreciate it if
					you pay off the debt as soon as possible
				</p>
				<div className="pt-1">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="gap-4 flex flex-col"
					>
						{/* register your input into the hook by invoking the "register" function */}
						<input
							placeholder="Email"
							className="bg-gray-100 p-4 rounded-xl"
							{...register("email")}
							defaultValue={userContext.email}
						/>

						<input
							placeholder="Value"
							className="bg-gray-100 p-4 rounded-xl"
							{...register("value")}
						/>

						<div className="flex flex-row gap-4">
							<input
								placeholder="card"
								className="bg-gray-100 p-4 rounded-xl w-full"
								{...register("card")}
							/>
							<input
								placeholder="12/24"
								className="bg-gray-100 p-4 rounded-xl max-w-[80px]"
								{...register("year")}
							/>
							<input
								placeholder="cvv"
								className="bg-gray-100 p-4 rounded-xl max-w-[70px]"
								{...register("cvv")}
							/>
						</div>

						{/* include validation with required or other standard HTML validation rules */}

						<Button label="Pay" type={"submit"} />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Popup;
