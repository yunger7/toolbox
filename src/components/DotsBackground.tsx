import { useState, useEffect, useCallback, useRef } from "react";
import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import type { ReactNode } from "react";

type VantaDotsOptions = {
	el: HTMLElement | string | null;
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
	showLines?: boolean;
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
		if (vantaEffect) vantaEffect.destroy();

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
				showLines: false,
			})
		);
	}

	return (
		<>
			<Box
				ref={ref}
				sx={{
					width: "100vw",
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			{children}
		</>
	);
};
