import { Stack } from "@fluentui/react/lib/Stack";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";


const Bio = () => {
	const data = useStaticQuery(
		graphql`
			query BioQuery {
				site {
					siteMetadata {
						author {
							name
							bio
						}
						social {
							github
							linkedin
						}
					}
				}
			}
		`
	);

	// Set these values by editing "siteMetadata" in gatsby-config.js
	const author = data.site.siteMetadata?.author;
	const social = data.site.siteMetadata?.social;

	return (
		<Stack horizontal>
			<StaticImage
				layout="fixed"
				formats={["auto", "webp", "avif"]}
				src="../images/profile-pic.jpg"
				width={50}
				height={50}
				quality={95}
				alt="Profile picture"
			/>
			{author?.name && (
				<p>
					Site by <strong>{author.name}</strong>
					<br />
					<a href={`${social?.github || ``}`}>
						Follow on Github
					</a>
				</p>
			)}
		</Stack>
	);
};

export default Bio;
