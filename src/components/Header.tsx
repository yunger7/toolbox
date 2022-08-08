import {
	Header as MantineHeader,
	MediaQuery,
	Burger,
	ActionIcon,
	Box,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import { TbSun as IconLight, TbMoon as IconDark } from "react-icons/tb";

import { Logo } from "@/components/Logo";

type HeaderProps = {
	opened: boolean;
	onBurgerClick: () => void;
};

export const Header = (props: HeaderProps) => {
	const { opened, onBurgerClick } = props;

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<MantineHeader height={60} p="md">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: "100%",
				}}
			>
				<MediaQuery largerThan="sm" styles={{ display: "none" }}>
					<Burger opened={opened} onClick={onBurgerClick} size="sm" mr="xs" />
				</MediaQuery>

				<Logo />

				<Box sx={{ marginLeft: "auto" }}>
					<Tooltip label={colorScheme === "dark" ? "Light mode" : "Dark mode"}>
						<ActionIcon variant="default" onClick={() => toggleColorScheme()}>
							{colorScheme === "dark" ? (
								<IconLight size={18} />
							) : (
								<IconDark size={18} />
							)}
						</ActionIcon>
					</Tooltip>
				</Box>
			</Box>
		</MantineHeader>
	);
};
