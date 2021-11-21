import React from "react";
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

import {
	DetailsList,
	DetailsListLayoutMode,
	CheckboxVisibility,
} from "@fluentui/react/lib/DetailsList";

const TagsPage = ({ data, location }) => {
	const _items = data.allMarkdownRemark.group.map(tag => {
		return {
			key: kebabCase(tag.fieldValue),
			name: tag.fieldValue,
			totalCount: tag.totalCount,
			posts: tag.nodes,
		};
	});
	const _columns = [
		{
			key: "name",
			name: "Name",
			fieldName: "name",
			minWidth: 100,
			maxWidth: 200,
			isResizable: false,
			onRender: item => <Link to={`/tags/${item.key}`}>{item.name}</Link>,
		},
		{
			key: "totalCount",
			name: "Post Count",
			fieldName: "totalCount",
			minWidth: 100,
			maxWidth: 200,
			isResizable: false,
		},
	];

	return (
		<Layout location={location} title={data.site.siteMetadata.title}>
			<h2>Blog Post Tags</h2>
			<br />
			<DetailsList
				items={_items}
				columns={_columns}
				setKey="set"
				layoutMode={DetailsListLayoutMode.justified}
				checkboxVisibility={CheckboxVisibility.hidden}
				compact={false}
			/>
		</Layout>
	);
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { tags: { ne: "" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        nodes {
          frontmatter {
            title
            tags
            date
          }
          id
        }
      }
    }
  }
`;
