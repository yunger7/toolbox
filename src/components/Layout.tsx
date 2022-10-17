import { useState } from "react";

import { AppShell, Center, Paper, Stack, Title, Text } from "@mantine/core";

import { DotsBackground } from "@/components/DotsBackground";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";

import type { ReactNode } from "react";
import type { Tool } from "website.config";

type LayoutProps = {
	tool?: Tool;
	settings?: ReactNode;
	children?: ReactNode;
};

export const Layout = (props: LayoutProps) => {
	const { settings, tool, children } = props;

	const [opened, setOpened] = useState(false);

	return (
		<AppShell
			fixed
			navbarOffsetBreakpoint="sm"
			navbar={<Navbar opened={opened} settings={settings} />}
			header={
				<Header opened={opened} onBurgerClick={() => setOpened(o => !o)} />
			}
			styles={{
				main: {
					paddingTop: "var(--mantine-header-height) !important",
					paddingBottom: "var(--mantine-footer-height) !important",
					paddingLeft: "var(--mantine-navbar-width) !important",
					paddingRight: "var(--mantine-aside-width) !important",
				},
			}}
		>
			<Center sx={{ width: "100%", height: "100%" }}>
				{tool ? (
					<Paper
						shadow="xl"
						sx={theme => ({
							width: "100%",
							maxWidth: 750,
							padding: theme.spacing.xl,
							margin: theme.spacing.xl,
							zIndex: 1,

							[theme.fn.smallerThan("sm")]: {
								padding: theme.spacing.md,
							},

							[theme.fn.smallerThan("xs")]: {
								margin: 0,
								padding: theme.spacing.xs,
							},
						})}
					>
						<Stack align="center" spacing={0} mb="lg">
							{tool.icon && <tool.icon size={42} />}
							<Title order={2} align="center">
								{tool.name}
							</Title>
							{tool.description && (
								<Text size="sm" align="center">
									{tool.description}
								</Text>
							)}
						</Stack>
						{children}
					</Paper>
				) : (
					children
				)}
			</Center>
		</AppShell>
	);
};
