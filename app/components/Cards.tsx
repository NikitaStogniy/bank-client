"use client";
import { useContext, useEffect } from "react";
import Card from "./Card";
import useSWR from "swr";
import { MyContext } from "../context/context";

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

const fetcher = async (url: string, id: number) => {
	try {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			user_id: id,
		});

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

interface CardsProps {
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
	userContext: User;
	setReload: React.Dispatch<React.SetStateAction<number>>;
	reload: number;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	promise: number;
	setPromise: React.Dispatch<React.SetStateAction<number>>;
}

const Cards: React.FC<CardsProps> = ({
	setUser,
	userContext,
	reload,
	setReload,
	setOpen,
	promise,
	setPromise,
}) => {
	const { data, error, mutate } = useSWR(
		"https://api.retool.com/v1/workflows/2bde945c-db31-447d-85ba-5063eec30430/startTrigger?workflowApiKey=retool_wk_6f020490d9da46a98045a0e4dd3b895e",
		(url) => fetcher(url, userContext.id)
	);
	useEffect(() => {
		setTimeout(() => {
			mutate();
			if (error) {
				console.error(error);
			} else if (data != undefined && userContext.id == data.id) {
				setUser(data);
			}
		}, 2000);
	}, [reload]);
	return (
		<>
			{userContext ? (
				<>
					<Card
						userContext={userContext}
						setReload={setReload}
						reload={reload}
						setUser={setUser}
						setOpen={setOpen}
						type="balance"
						promise={promise}
						setPromise={setPromise}
					/>
					<Card
						userContext={userContext}
						setReload={setReload}
						reload={reload}
						setUser={setUser}
						setOpen={setOpen}
						type="curPromise"
						promise={promise}
						setPromise={setPromise}
					/>
					<Card
						userContext={userContext}
						setReload={setReload}
						reload={reload}
						setUser={setUser}
						setOpen={setOpen}
						type="makePromise"
						promise={promise}
						setPromise={setPromise}
					/>
				</>
			) : (
				""
			)}
		</>
	);
};

export default Cards;
