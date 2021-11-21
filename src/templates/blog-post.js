import * as React from "react";
import { Link, graphql } from "gatsby";
import { Text } from "@fluentui/react/lib/Text";
import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata?.title || `Title`;
	const { previous, next } = data;
	const tagLinks = post.frontmatter.tags.map(tag => (
		<span>
			<Link to={`/tags/${tag}`}>{tag}</Link>&nbsp;
		</span>
	));

	return (
		<Layout location={location} title={siteTitle}>
			<Seo
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<article itemScope itemType="http://schema.org/Article">
				<header>
					<h1 itemProp="headline">{post.frontmatter.title}</h1>
					<Text variant="xxLarge">{post.frontmatter.date}</Text>
					<br />
					<Text variant="large">tags:&nbsp;{tagLinks}</Text>
					<br />
					<br />
				</header>
				<section
					dangerouslySetInnerHTML={{ __html: post.html }}
					itemProp="articleBody"
				/>
				<hr />
			</article>
			<nav>
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.fields.slug} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						<Link to={"/"}>Index</Link>
					</li>
					<li>
						{next && (
							<Link to={next.fields.slug} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</Layout>
	);
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
