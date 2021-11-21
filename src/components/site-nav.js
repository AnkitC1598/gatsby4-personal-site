import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { Nav } from "@fluentui/react/lib/Nav";
import { Text } from "@fluentui/react/lib/Text";

const SiteNav = () => (
	<StaticQuery
		query={graphql`
			query SiteNavQuery {
				site {
					siteMetadata {
						title
						social {
							github
							linkedin
							twitter
						}
					}
				}
			}
		`}
		render={data => {
			let brandLinks = [];
			for (let key in data.site.siteMetadata.social) {
				if (key !== undefined)
					brandLinks.push({
						name: key,
						url: data.site.siteMetadata.social[key],
						key: `site-nav-link-${key}`,
						target: "_blank",
					});
			}

			const navLinkGroups = [
				{
					name: "Site Pages",
					links: [
						{ name: "Blog", url: "/", key: "blog", target: "_self" },
						{ name: "Tags", url: "/tags", key: "tags", target: "_self" },
						{
							name: "Gallery",
							url: "/gallery",
							key: "gallery",
							target: "_self",
						},
						{
							name: "Blackjack",
							url: "/blackjack",
							key: "blackjack",
							target: "_self",
						},
					],
				},
				{
					name: "Brand Links",
					links: brandLinks,
				},
			];

			const navStyles = {
				root: {
					boxSizing: "border-box",
					overflowY: "hidden",
					overflowX: "hidden",
				},
				link: {
					whiteSpace: "normal",
					lineHeight: "inherit",
					height: "1.5em",
				},
			};

			const _onRenderGroupHeader = group => (
				<Text variant="xLarge">{group.name}</Text>
			);

			return (
				<Nav
					onRenderGroupHeader={_onRenderGroupHeader}
					ariaLabel="Site Nav"
					groups={navLinkGroups}
					styles={navStyles}
				/>
			);
		}}
	/>
);

export default SiteNav;
