import React, { useEffect, useState } from "react";
import useSWR from "swr";

type Transaction = {
	id: number;
	date: string;
	value: number;
	goal: number;
};

const fetcher = async (url: string, id: number) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		user_id: id,
	});
	const response = await fetch(url, {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	});
	const data = await response.json();
	console.log(id);
	return data;
};

type User = {
	id: number;
	name: string;
	debt: number;
	phone: string;
	email: string;
};

interface TransactionProps {
	reload: number;
	userContext: User;
	setReload: React.Dispatch<React.SetStateAction<number>>;
}

const Transactions: React.FC<TransactionProps> = ({
	reload,
	userContext,
	setReload,
}) => {
	let tableHeader = ["id", "Value", "Date", "Promise"];
	const { data, error, mutate } = useSWR(
		"https://api.retool.com/v1/workflows/9214cdd2-7089-4d26-a3af-0dbaeca43a28/startTrigger?workflowApiKey=retool_wk_73ae0050370e4e8a86e46af99ecff192",
		(url) => fetcher(url, userContext.id)
	);

	useEffect(() => {
		mutate();
	}, [reload]);

	if (data && data.length > 0) {
		return (
			<div className="bg-white rounded-xl p-4 w-fit">
				<div className="text-[#CCCCCC] font-medium flex flex-row">
					<div>Transactions</div>
				</div>
				<table className="border-separate border-spacing-2">
					<thead className="border-separate border-spacing-2 ">
						<tr className="border-separate border-spacing-2 ">
							{tableHeader.map((header, index) => (
								<th
									className="bg-gray-100 rounded-xl py-2 px-4 text-gray-300 border-separate border-spacing-2 "
									key={index}
								>
									{header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="max-h-[100px] overflow-scroll">
						{data.map((item: Transaction, index: number) => (
							<tr key={index}>
								<td className="bg-gray-100/50 rounded-xl py-2 px-4 text-gray-600 border-separate border-spacing-2 ">
									{item.id}
								</td>
								<td className="bg-gray-100/50 rounded-xl py-2 px-4 text-gray-600 border-separate border-spacing-2 ">
									{item.value}
								</td>
								<td className="bg-gray-100/50 rounded-xl py-2 px-4 text-gray-600 border-separate border-spacing-2 ">
									{item.date}
								</td>
								<td className="bg-gray-100/50 rounded-xl py-2 px-4 text-gray-600 border-separate border-spacing-2 ">
									{item.goal}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} else {
		return (
			<div className="bg-gray-100 p-4 rounded-xl text-center">
				You don't have any transactions yet
			</div>
		);
	}
};

export default Transactions;
