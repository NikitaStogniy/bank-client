"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";

const fetcher = async (url: string, id: number) => {
	try {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify({ user_id: id });

		const response = await fetch(url, {
			method: "POST",
			body: raw,
			headers: myHeaders,
		});

		if (!response.ok) {
			throw new Error("An error occurred while fetching the data.");
		}

		const data = await response.json();
		return data[0];
	} catch (e) {
		console.error(e);
	}
};

type Inputs = {
	value: string;
	date: Date;
	goal: number;
};

type data = {
	id: number;
	goal: number;
	value: number;
	date: null;
	status: string;
	client: number;
	deadline: string;
};

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface CardProps {
	type: "balance" | "curPromise" | "makePromise";
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	userContext: User;
	setReload: React.Dispatch<React.SetStateAction<number>>;
	reload: number;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	promise: number;
	setPromise: React.Dispatch<React.SetStateAction<number>>;
}

const Card: React.FC<CardProps> = ({
	type,
	setUser,
	userContext,
	setReload,
	reload,
	setOpen,
	promise,
	setPromise,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const handleClick = () => {
		setOpen(true);
	};

	if (type == "makePromise") {
		const onSubmitdata: SubmitHandler<Inputs> = (data) => {
			if (parseInt(data.value) > userContext?.debt) {
				alert("ALERT!");
			} else {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
					user_id: userContext?.id,
					deadline: data.date,
					goal: data.goal,
				});

				fetch(
					"https://api.retool.com/v1/workflows/897d2bcc-a0f6-4873-94f7-ec9254d41407/startTrigger?workflowApiKey=retool_wk_e6588d172a1e4b2090b000efc3ffa029",
					{ method: "POST", headers: myHeaders, body: raw, redirect: "follow" }
				)
					.then((response) => response.text())
					.then((result) => {
						setReload(reload + 1);
						setPromise(parseInt(data.value));
						console.log("Success");
					})
					.catch((error) => console.log("error", error));
			}
		};

		return (
			<div className={`bg-white rounded-xl p-4`}>
				<div className="text-[#CCCCCC] font-medium">Make a new Promise!</div>

				<div className="pt-1">
					<form
						onSubmit={handleSubmit(onSubmitdata)}
						className="gap-4 flex flex-row"
					>
						{/* register your input into the hook by invoking the "register" function */}
						<input
							placeholder="Value"
							defaultValue={userContext?.debt}
							className="bg-gray-100 p-4 rounded-xl"
							{...register("goal")}
						/>

						{/* include validation with required or other standard HTML validation rules */}
						<input
							className="bg-gray-100 p-4 rounded-xl"
							type="date"
							placeholder="Choose date"
							{...register("date", { required: true })}
						/>
						{/* errors will return when field validation fails  */}
						{errors.date && <span>This field is required</span>}

						<Button label="Promise" type="submit" />
					</form>
				</div>
			</div>
		);
	} else {
		const { data, error, mutate } = useSWR(
			"https://api.retool.com/v1/workflows/3cf5093b-05ba-4aaa-b98b-21e4dfa5b2ea/startTrigger?workflowApiKey=retool_wk_f3adde1752024ffbbb6de94bf58de148",
			(url) => fetcher(url, userContext.id)
		);

		useEffect(() => {
			setTimeout(() => {
				mutate();
				if (error) {
					console.error(error);
				} else if (data) {
					setPromise(data.goal);
				}
			}, 5000);
		}, [reload]);

		if (data) {
			return (
				<div
					className={`bg-white rounded-xl p-4 ${
						!data
							? type == "curPromise"
								? " hidden "
								: ""
							: data!.status == "Success" && type == "curPromise"
							? " hidden "
							: ""
					}`}
				>
					<div className="text-[#CCCCCC] font-medium">
						{type == "balance" ? (
							<div>Current balance</div>
						) : (
							<div>
								Promise for
								<span className="text-[#111111]"> {data?.deadline}</span>
							</div>
						)}
					</div>

					<div
						className={`font-medium ${
							type == "balance"
								? " text-[#D11B1B] text-4xl pt-3"
								: " text-[#111111] text-2xl pt-1"
						} `}
					>
						{type == "curPromise" ? (
							<div className="flex flex-row justify-between align-center items-center">
								<div>
									{data?.value! > 0 ? (
										<div className="text-sm line-through">{data?.goal}$</div>
									) : (
										""
									)}
									{data?.goal - data?.value}$
								</div>
								<Button action={() => handleClick()} label="Pay" />
							</div>
						) : (
							<div>{userContext?.debt * -1}$</div>
						)}
					</div>
				</div>
			);
		}
	}
};

export default Card;
