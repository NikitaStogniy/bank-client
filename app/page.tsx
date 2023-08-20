"use client";

import Transactions from "./components/Transactions";
import CurrencyContainer from "./components/CurrencyContainer";
import { StrictMode, useEffect, useState } from "react";
import ChooseUser from "./components/ChooseUser";
import { MyContext } from "./context/context";
import Popup from "./components/Popup";
import UserProfile from "./components/UserProfile";
import Cards from "./components/Cards";
import GoodTime from "./components/GoodTime";
type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

type Transaction = {
	id: number;
	date: string;
	value: number;
	goal: number;
};

export default function Home() {
	const [userContext, setUserContext] = useState<User>();
	const [open, setOpen] = useState<boolean>(false);
	const [reload, setReload] = useState<number>(0);
	const [promise, setPromise] = useState<number>(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	return (
		<StrictMode>
			{!userContext ? (
				<ChooseUser
					reload={reload}
					setReload={setReload}
					setUser={setUserContext}
				/>
			) : (
				<div>
					{open == true ? (
						<Popup
							userContext={userContext}
							setUser={setUserContext}
							open={open}
							setOpen={setOpen}
							setReload={setReload}
							promiseValue={promise}
							reload={reload}
						/>
					) : (
						""
					)}
					<main className="flex min-h-screen flex-col items-startß px-24 py-8 bg-[#fafafa]">
						<UserProfile
							setUser={setUserContext}
							userContext={userContext}
							reload={reload}
							setReload={setReload}
						/>
						<CurrencyContainer />
						<div className="text-8xl font-medium text-gray-300 line-0">
							<GoodTime userContext={userContext} />
						</div>
						<div className="flex flex-row gap-4 mt-8">
							<Cards
								promise={promise}
								setPromise={setPromise}
								setUser={setUserContext}
								reload={reload}
								setReload={setReload}
								userContext={userContext}
								setOpen={setOpen}
							/>
						</div>
						<div className="mt-4">
							<Transactions
								reload={reload}
								setReload={setReload}
								userContext={userContext}
							/>
						</div>
					</main>
				</div>
			)}
		</StrictMode>
	);
}
