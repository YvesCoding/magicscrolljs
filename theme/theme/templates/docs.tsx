import React from 'react';
import { graphql } from 'gatsby';
import WrapperLayout from '../components/layout';
import MainContent from '../components/Content/MainContent';

export interface IGraphqlFrontmatterData {
  title: string;
  important: boolean;
  subtitle: string;
  disabled: boolean;
  link: string;
}

export interface IMarkDownFields {
  slug: string;
  path: string;
  modifiedTime: string;
  avatarList: Array<{
    href: string;
    text: string;
    src: string;
  }>;
}

export interface IMdxData {
  code: {
    body: string;
  };
  tableOfContents: {
    items: Array<{
      url: string;
      title: string;
    }>;
  };
  frontmatter: IGraphqlFrontmatterData;
  fields: IMarkDownFields;
}

export interface IAllMdxData {
  edges: Array<{
    node: {
      frontmatter: IGraphqlFrontmatterData;
      fields: IMarkDownFields;
    };
  }>;
}

export default function Template({
  data,
  pageContext,
  ...rest
}: {
  data: { mdx: IMdxData; allMdx: IAllMdxData };
  isMobile: boolean;
  location: {
    pathname: string;
  };
  pageContext: {
    webConfig: any;
    slug: string;
  };
}) {
  const { mdx, allMdx } = data;
  const { frontmatter, fields, code, tableOfContents } = mdx;
  const { edges } = allMdx;
  const menuList = edges.map(({ node }) => {
    return {
      slug: node.fields.slug,
      meta: {
        ...node.frontmatter,
        slug: node.fields.slug,
        filename: node.fields.slug,
      },
      ...node.frontmatter,
      filename: node.fields.path,
    };
  });
  return (
    <WrapperLayout data={data} pageContext={pageContext} {...rest}>
      <MainContent
        {...rest}
        localizedPageData={{
          meta: {
            ...frontmatter,
            ...fields,
            filename: fields.slug,
          },
          toc: tableOfContents,
          code,
        }}
        menuList={menuList}
      />
    </WrapperLayout>
  );
}

export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!) {
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { glob: "/docs/*" } } }
    ) {
      edges {
        node {
          code {
            body
          }
          frontmatter {
            title
            important
            subtitle
            disabled
            link
          }
          fields {
            slug
            path
          }
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      tableOfContents
      frontmatter {
        title
      }
      fields {
        modifiedTime
        path
        slug
        avatarList
      }
      code {
        body
      }
    }
  }
`;
