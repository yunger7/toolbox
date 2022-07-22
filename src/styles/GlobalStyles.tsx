import { useMemo } from "react";
import { Global } from "@mantine/core";

import { nord } from "@/styles/nord";

export const GlobalStyles = () => {
	const nordCSSVariables = useMemo(() => {
		const CSSVariables: { [key: string]: string } = {};

		nord.forEach((hex, index) => {
			CSSVariables[`--nord${index}`] = hex;
		});

		return CSSVariables;
	}, []);

	return (
		<Global
			styles={theme => ({
				"*, *::before, *::after": {
					boxSizing: "border-box",
				},

				":root": {
					...nordCSSVariables,
				},
			})}
		/>
	);
};
