import {
	TbLetterCase as IconCaseConverter,
	TbBoxMultiple7 as IconCharacterCount,
	TbTypography as IconLoremIpsum,
	TbLock as IconStrongPasswordGenerator,
} from "react-icons/tb";

import type { IconType } from "react-icons";

type ReleasedTool = {
	released: true;
	href: string;
};

type UnreleasedTool = {
	released: false;
	href?: string;
};

export type Tool = (ReleasedTool | UnreleasedTool) & {
	name: string;
	description: string;
	icon?: IconType;
};

export const tools: Tool[] = [
	{
		name: "Case converter",
		description:
			"Convert text between cases, such as UPPERCASE, lowercase, snake_case and more.",
		released: true,
		href: "/case-converter",
		icon: IconCaseConverter,
	},
	{
		name: "Character count",
		description:
			"Count information about your text, such as characters, words, sentences and more.",
		released: true,
		href: "/character-count",
		icon: IconCharacterCount,
	},
	{
		name: "Lorem ipsum generator",
		description: "Generate dummy text to use as a placeholder.",
		released: true,
		href: "/lorem-ipsum",
		icon: IconLoremIpsum,
	},
	{
		name: "Strong password generator",
		description: "Create secure, randomly generated passwords to use online.",
		released: false,
		icon: IconStrongPasswordGenerator,
	},
];

export const getTool = (name: string) => {
	return tools.find(tool => tool.name.toLowerCase() == name.toLowerCase());
};
