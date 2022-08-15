import Link from "next/link";
import {
	Title,
	Text,
	Container,
	Badge,
	Group,
	Stack,
	Box,
	Divider,
	SimpleGrid,
	Card,
	Button,
} from "@mantine/core";
import { colors } from "@yungerdev/theme";
import { TbWand as IconLogo } from "react-icons/tb";

import { Header } from "@/components/Header";
import { tools } from "website.config";

const Home = () => {
	return (
		<>
			<Header variant="landing" />
			<Container size="lg" mt="md" py="xl">
				<Title order={1} mb="md">
					<Group spacing="xs">
						<IconLogo size={48} color={colors.nord["Frost2"]} />
						<span>Toolbox</span>
					</Group>
				</Title>
				<Text weight={500}>
					A collection of tools used by{" "}
					<Text inherit variant="link" component="a" href="https://yunger.dev/">
						a digital craftsman
					</Text>
					.
				</Text>
				<Divider my="xl" />
				<SimpleGrid
					cols={3}
					spacing="xl"
					breakpoints={[
						{ maxWidth: "sm", cols: 2 },
						{ maxWidth: "xs", cols: 1 },
					]}
				>
					{tools
						.sort(t => (t.released ? -1 : 1))
						.map(tool => (
							<Card withBorder shadow="sm" radius="md" key={tool.name}>
								<Stack
									spacing="xs"
									justify="space-between"
									sx={{ height: "100%" }}
								>
									<Box>
										<Group position="apart" align="flex-start">
											{tool.icon && <tool.icon size={42} />}
											{!tool.released && <Badge color="red">Soon</Badge>}
										</Group>
										<Text
											weight={500}
											sx={theme => ({
												marginTop: theme.spacing.xs / 2,
											})}
										>
											{tool.name}
										</Text>
										<Text size="sm">{tool.description}</Text>
									</Box>
									<Link passHref href={tool.href || ""}>
										<Button
											fullWidth
											component="a"
											size="sm"
											variant="outline"
											mt="sm"
											disabled={!tool.released}
										>
											Use
										</Button>
									</Link>
								</Stack>
							</Card>
						))}
				</SimpleGrid>
			</Container>
		</>
	);
};

export default Home;
