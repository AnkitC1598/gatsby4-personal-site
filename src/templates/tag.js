import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
// import Seo from "../components/seo";

const Tags = ({ pageContext, data, location }) => {
	const { tag } = pageContext;
	const { edges, totalCount } = data.allMarkdownRemark;
	const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
		} tagged with "${tag}"`;

	return (
		<Layout title={data.site.siteMetadata.title} location={location}>
			<h2>{tagHeader}</h2>
			<br />
			<br />
			<ul>
				{edges.map(({ node }) => {
					const { slug } = node.fields;
					const { title } = node.frontmatter;
					return (
						<li key={slug}>
							<Link to={slug}>{title}</Link>
						</li>
					);
				})}
			</ul>
			<Link to="/tags">All tags</Link>
		</Layout>
	);
};

export default Tags;

export const pageQuery = graphql`
	query ($tag: String) {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
			) {
				totalCount
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
						}
					}
				}
			}
			site {
				siteMetadata {
					title
				}
		}
	}
`;
