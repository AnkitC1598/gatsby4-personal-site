import { DefaultPalette } from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { Link } from "gatsby";
import React from "react";
import SiteNav from "./site-nav";



const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	const isRootPath = location.pathname === rootPath;

	// Styles definition
	const containerStackStyles = {
		root: {
			background: DefaultPalette.tealLight,
			minHeight: "100vh",
		},
	};
	const midStackStyles = {
		root: {
			background: DefaultPalette.white,
			childrenGap: 5,
			maxWidth: "800px",
			minWidth: "500px",
		},
	};
	const leftStackStyles = {
		root: {
			background: DefaultPalette.tealLight,
			minWidth: "100px",
			padding: "10px",
		},
	};
	const rightStackStyles = {
		root: {
			background: DefaultPalette.tealLight,
			minWidth: 0,
		},
	};

	// Tokens definition
	const containerStackTokens = { childrenGap: 5 };
	const midStackTokens = { padding: 20 };

	return (
		<Stack
			horizontal
			horizontalAlign="start"
			styles={containerStackStyles}
			tokens={containerStackTokens}
		>
			<Stack styles={leftStackStyles} disableShrink horizontalAlign="center">
				{!isRootPath && (
					<Link to="/">
						<Text variant="xxLarge">{title}</Text>
					</Link>
				)}
				<SiteNav />
			</Stack>

			<Stack
				disableShrink
				verticalAlign="space-between"
				styles={midStackStyles}
				tokens={midStackTokens}
			>
				{isRootPath && (
					<Stack.Item align="start">
						<header>
							<Link to="/">
								<Text variant="mega">{title}</Text>
							</Link>
						</header>
					</Stack.Item>
				)}

				<Stack.Item grow={3} verticalAlign="stretch">
					<main>{children}</main>
				</Stack.Item>

				<Stack.Item grow={1} shrink align="auto">
					<footer>
						{`© ${new Date().getFullYear()}`} Ankit Chaudhari, All rights reserved.
						{` `}
						Built with{" "}
						<a
							href="https://www.gatsbyjs.com"
							rel="noopener noreferrer"
							target="_blank"
						>
							Gatsby
						</a>
						.<br />
						Credits{` `}
						<a
							href="https://github.com/codegard1"
							rel="noopener noreferrer"
							target="_blank"
						>
							Codegard1
						</a>
						.
					</footer>
				</Stack.Item>
			</Stack>

			<Stack shrink={2} styles={rightStackStyles}>
				{` `}
			</Stack>
		</Stack>
	);
};

export default Layout;
