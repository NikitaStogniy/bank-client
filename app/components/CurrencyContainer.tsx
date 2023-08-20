"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Currency from "./Currency";

const CurrencyContainer = () => {
	const [data, setData] = useState(Array);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://api.currencyapi.com/v3/latest?apikey=cur_live_COdiogOTNeI6QXgfpneZOwb3ZcTV4yOYSsCTmyow&currencies=EUR%2CGBP%2CPHP"
			);
			setData([
				Math.round((response.data.data.EUR.value + Number.EPSILON) * 100) / 100,
				Math.round((response.data.data.GBP.value + Number.EPSILON) * 100) / 100,
				Math.round((response.data.data.PHP.value + Number.EPSILON) * 100) / 100,
			]);
		};

		fetchData();
		console.log(data);
	}, []);

	return (
		<div className={`ease-in-out duration-300 flex flex-row gap-4`}>
			<Currency currencyText={"EUR " + 0.78} />
			<Currency currencyText={"GBP " + 0.81} />
			<Currency currencyText={"PHP " + 2.72} />
		</div>
	);
};
export default CurrencyContainer;
