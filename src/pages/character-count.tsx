import { useState } from "react";
import { Textarea, Group, Text, Divider } from "@mantine/core";

import { Layout } from "@/components/Layout";

import { getTool } from "website.config";

const CharacterCount = () => {
	const [text, setText] = useState("");

	const tool = getTool("character count");

	return (
		<Layout tool={tool}>
			<Textarea
				autosize
				minRows={2}
				maxRows={5}
				placeholder="Start typing..."
				aria-label="Text to count"
				onChange={e => setText(e.target.value)}
			/>
			<Divider mt="sm" mb="xs" />
			<Group position="center">
				<Text size="sm" component="span">
					Characters: {text.length}
				</Text>
				<Text size="sm" component="span">
					Words: {text.split(" ").filter(n => n != "").length}
				</Text>
				<Text size="sm" component="span">
					Sentences: {text.match(/[\w|\)][.?!](\s|$)/g)?.length || 0}
				</Text>
				<Text size="sm" component="span">
					Lines:{" "}
					{text.length === 0 ? "0" : (text.match(/\n/g) || "").length + 1}
				</Text>
				<Text size="sm" component="span">
					Spaces: {text.split(" ").length - 1}
				</Text>
			</Group>
		</Layout>
	);
};

export default CharacterCount;
