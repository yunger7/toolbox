import { forwardRef } from "react";
import { Group, Stack, Textarea, Button, Select, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import type { ComponentPropsWithoutRef } from "react";

import { Layout } from "@/components/Layout";

import { getTool } from "website.config";

const supportedCases = [
	"Uppercase",
	"Lowercase",
	"Snake case",
	"Camel case",
	"Pascal case",
	"Alternating case",
] as const;

type SupportedCases = typeof supportedCases[number];

const convert = (value: string, target: SupportedCases) => {
	let newValue = value;

	switch (target) {
		case "Uppercase":
			newValue = value.toUpperCase();
			break;
		case "Lowercase":
			newValue = value.toLowerCase();
			break;
		case "Snake case":
			newValue = value
				.replace(/\W+/g, " ")
				.split(/ |\B(?=[A-Z])/)
				.map(word => word.toLowerCase())
				.join("_");
			break;
		case "Camel case":
			newValue = value
				.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
					return index === 0 ? word.toLowerCase() : word.toUpperCase();
				})
				.replace(/\s+/g, "");
			break;
		case "Pascal case":
			newValue = value.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
				return g1.toUpperCase() + g2.toLowerCase();
			});
			break;
		case "Alternating case":
			const chars = value.toLowerCase().split("");

			for (let i = 0; i < chars.length; i += 2) {
				chars[i] = chars[i].toUpperCase();
			}

			newValue = chars.join("");
			break;
		default:
			throw new Error("Invalid target");
	}

	return newValue;
};

type FormValues = {
	text: string;
	target: SupportedCases;
};

const CaseConverter = () => {
	const form = useForm<FormValues>({
		initialValues: {
			text: "",
			target: "Uppercase",
		},
	});

	const tool = getTool("case converter");

	function convertCase(data: FormValues) {
		const { text, target } = data;
		const newText = convert(text, target);

		form.setFieldValue("text", newText);
	}

	return (
		<Layout
			tool={tool}
			settings={
				<>
					<Select
						required
						searchable
						label="Case"
						placeholder="Pick one"
						data={[...supportedCases]}
						itemComponent={SelectItem}
						{...form.getInputProps("target")}
					/>
				</>
			}
		>
			<form onSubmit={form.onSubmit(convertCase)}>
				<Stack spacing="sm">
					<Textarea
						autosize
						minRows={2}
						maxRows={5}
						placeholder="Start typing..."
						aria-label="Text to convert"
						{...form.getInputProps("text")}
					/>
					<Group my="md" position="center">
						<Button type="submit">Convert</Button>
					</Group>
				</Stack>
			</form>
		</Layout>
	);
};

type SelectItemProps = ComponentPropsWithoutRef<"div"> & {
	label: SupportedCases;
};

const demoText = "My awesome text";

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
	({ label, ...others }: SelectItemProps, ref) => {
		const convertedDemoText = convert(demoText, label);

		return (
			<div ref={ref} {...others}>
				<Text weight={600}>{label}</Text>
				<Text
					size="sm"
					lineClamp={1}
					sx={{
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						overflow: "hidden",
						width: "100%",
						opacity: 0.75,
					}}
				>
					{convertedDemoText}
				</Text>
			</div>
		);
	}
);

export default CaseConverter;
