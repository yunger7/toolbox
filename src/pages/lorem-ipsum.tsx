import { useState } from "react";
import { loremIpsum } from "lorem-ipsum";
import {
	Textarea,
	Slider,
	Text,
	Box,
	CopyButton,
	Button,
	Group,
} from "@mantine/core";
import { TbCopy as IconCopy } from "react-icons/tb";

import { Layout } from "@/components/Layout";
import { getTool } from "website.config";

const LoremIpsumGenerator = () => {
	const [numOfSentences, setNumOfSentences] = useState(5);
	const [numOfParagraphs, setNumOfParagraphs] = useState(1);

	const tool = getTool("lorem ipsum generator");

	const text = [...Array(numOfParagraphs)]
		.map((_, i) => {
			let lorem = loremIpsum({
				count: numOfSentences,
			});

			if (i !== numOfParagraphs - 1) lorem += "\n\n";
			return lorem;
		})
		.join("");

	return (
		<Layout
			tool={tool}
			settings={
				<>
					<Box mb="sm">
						<Text size="sm" weight={600} mb="xs">
							Number of sentences
						</Text>
						<Slider
							min={1}
							max={10}
							marks={[
								{ value: 1, label: "1" },
								{ value: 10, label: "10" },
							]}
							value={numOfSentences}
							onChange={n => setNumOfSentences(n)}
						/>
					</Box>
					<Box mb="sm">
						<Text size="sm" weight={600} mb="xs">
							Number of paragraphs
						</Text>
						<Slider
							min={1}
							max={10}
							marks={[
								{ value: 1, label: "1" },
								{ value: 10, label: "10" },
							]}
							value={numOfParagraphs}
							onChange={n => setNumOfParagraphs(n)}
						/>
					</Box>
				</>
			}
		>
			<Textarea
				readOnly
				autosize
				minRows={2}
				maxRows={5}
				aria-label="Text to copy"
				value={text}
			/>
			<Group position="center" mt="md">
				<CopyButton value={text}>
					{({ copied, copy }) => (
						<Button onClick={copy} color={copied ? "frost1" : "frost2"}>
							{copied ? "Copied text" : "Copy text"}
						</Button>
					)}
				</CopyButton>
			</Group>
		</Layout>
	);
};

export default LoremIpsumGenerator;
