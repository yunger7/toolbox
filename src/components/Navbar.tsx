import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
	Navbar as MantineNavbar,
	NavLink,
	Box,
	Stack,
	Center,
	ScrollArea,
	Text,
	Indicator,
	SegmentedControl,
} from "@mantine/core";
import { TbTool as IconTool, TbSettings as IconSettings } from "react-icons/tb";

import { tools } from "website.config";

import type { ReactNode } from "react";

type NavbarProps = {
	opened: boolean;
	settings?: ReactNode;
};

type SegmentedControlValues = "tools" | "settings";

export const Navbar = ({ opened, settings }: NavbarProps) => {
	const router = useRouter();

	const [section, setSection] = useState<SegmentedControlValues>("settings");

	return (
		<MantineNavbar
			p="sm"
			hiddenBreakpoint="sm"
			hidden={!opened}
			width={{ sm: 300 }}
		>
			<MantineNavbar.Section>
				<SegmentedControl
					fullWidth
					value={section}
					onChange={(value: SegmentedControlValues) => setSection(value)}
					data={[
						{
							label: (
								<Center>
									<IconTool size={16} />
									<Box ml="xs">Tools</Box>
								</Center>
							),
							value: "tools",
						},
						{
							label: (
								<Center>
									<IconSettings size={16} />
									<Box ml="xs">Settings</Box>
								</Center>
							),
							value: "settings",
						},
					]}
				/>
			</MantineNavbar.Section>

			<MantineNavbar.Section
				grow
				offsetScrollbars
				component={ScrollArea}
				mt="lg"
				mx="-xs"
				px="xs"
			>
				{section === "settings" ? (
					<Stack>
						{settings || (
							<Text size="sm" align="center" color="dimmed">
								There are no settings for this tool
							</Text>
						)}
					</Stack>
				) : (
					tools.map(tool => (
						<Indicator
							color="red"
							label="Soon"
							size={16}
							offset={22}
							disabled={tool.released}
							key={tool.name}
							sx={{
								cursor: tool.released ? "default" : "not-allowed",
							}}
						>
							<Link passHref href={tool.href || ""}>
								<NavLink
									component="a"
									variant="filled"
									label={tool.name}
									icon={tool.icon ? <tool.icon size={18} /> : undefined}
									active={tool.href == router.pathname}
									disabled={!tool.released}
									sx={theme => ({
										borderRadius: theme.radius.sm,
									})}
								/>
							</Link>
						</Indicator>
					))
				)}
			</MantineNavbar.Section>
		</MantineNavbar>
	);
};
