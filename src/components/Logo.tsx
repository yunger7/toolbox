import Link from "next/link";
import { Center, Text, ActionIcon } from "@mantine/core";
import { TbWand as IconTools } from "react-icons/tb";

export const Logo = () => (
	<Center inline>
		<Link passHref href="/">
			<ActionIcon component="a">
				<IconTools fontSize={24} />
			</ActionIcon>
		</Link>
		<Text weight="bold" sx={theme => ({ marginLeft: theme.spacing.xs / 2 })}>
			Toolbox
		</Text>
	</Center>
);
