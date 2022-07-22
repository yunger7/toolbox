import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html>
				<Head>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" />
					<script src="https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.dots.min.js" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
