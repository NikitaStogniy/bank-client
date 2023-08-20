interface CurrencyProps {
	currencyText: String;
}

const Currency: React.FC<CurrencyProps> = ({ currencyText }) => {
	return (
		<div className="text-[#51CC5D]">
			{!currencyText ? "0.0" : currencyText} $
		</div>
	);
};

export default Currency;
