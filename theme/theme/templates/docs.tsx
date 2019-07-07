import React from 'react';
import { graphql } from 'gatsby';
import WrapperLayout from '../components/layout';
import MainContent from '../components/Content/MainContent';

interface IMarkDownFields {
  path: string;
  slug: string;
  modifiedTime: number;
  avatarList: Array<{
    href: string;
    text: string;
    src: string;
  }>;
}
export interface IFrontmatterData extends IMarkDownFields {
  title: string;
  order: number;
  filename: string;
  subtitle: string;
  path: string;
  disabled: boolean;
  important: boolean;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IGraphqlFrontmatterData extends Omit<IFrontmatterData, 'title'> {
  title: string;
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
            path: fields.path,
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
      }
      code {
        body
      }
    }
  }
`;
