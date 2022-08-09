import { useState, useEffect, useRef } from "react";
import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import type { ReactNode } from "react";

type VantaDotsOptions = {
	el: HTMLElement | null;
	mouseControls?: boolean;
	touchControls?: boolean;
	gyroControls?: boolean;
	backgroundColor?: string;
	size?: number;
	spacing?: number;
	minHeight?: number;
	minWidth?: number;
	scale?: number;
	scaleMobile?: number;
	color?: string;
	color2?: string;
};

/* Globally imported on `_document.tsx` */
declare const VANTA: {
	DOTS: (options: VantaDotsOptions) => any;
};

type DotsBackgroundProps = {
	children?: ReactNode;
};

export const DotsBackground = ({ children }: DotsBackgroundProps) => {
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();

	const ref = useRef<HTMLDivElement>(null);
	const [vantaEffect, setVantaEffect] = useState<any>();

	const { nord } = theme.other;

	useEffect(() => {
		setBackground();
	}, [colorScheme]);

	useEffect(() => {
		if (!vantaEffect) {
			setBackground();
		}

		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	function setBackground() {
		setVantaEffect(
			VANTA.DOTS({
				el: ref.current,
				mouseControls: false,
				touchControls: false,
				gyroControls: false,
				backgroundColor:
					colorScheme == "dark" ? theme.colors.dark["8"] : theme.white,
				color: nord["Frost4"],
				color2: colorScheme == "dark" ? theme.colors.dark["8"] : theme.white,
			})
		);
	}

	return (
		<Box
			ref={ref}
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			{children}
		</Box>
	);
};
