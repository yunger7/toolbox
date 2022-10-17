import Head from "next/head";
import { useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { getCookie, setCookies } from "cookies-next";

import { theme, TextSelection, Scrollbar } from "@yungerdev/theme";

import { DotsBackground } from "@/components/DotsBackground";

import type { GetServerSidePropsContext } from "next";
import type { AppProps } from "next/app";
import type { ColorScheme } from "@mantine/core";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;

	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	function toggleColorScheme(value?: ColorScheme) {
		const nextColorScheme =
			value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(nextColorScheme);
		setCookies("yungerdev-color-scheme", nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<>
			<Head>
				<title>Toolbox | yunger.dev</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{ ...theme, colorScheme }}
				>
					<Scrollbar />
					<TextSelection />
					<DotsBackground>
						<Component {...pageProps} />
					</DotsBackground>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie("yungerdev-color-scheme", ctx) || "light",
});
