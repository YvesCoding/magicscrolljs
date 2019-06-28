import React from 'react';
import Media from 'react-media';

import Home from '../components/home';
import WrapperLayout from '../components/layout';
import { graphql } from 'gatsby';

const IndexPage = props => {
  const isNode = typeof window === `undefined`;
  return (
    <WrapperLayout {...props}>
      <Media query="(max-width: 599px)">
        {isMobile => <Home {...props} isMobile={isMobile && !isNode} />}
      </Media>
    </WrapperLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query queryAllSnippets {
    allMdx(filter: { fields: { slug: { glob: "/snippets/*" } } }) {
      nodes {
        fields {
          slug
          path
        }
        code {
          body
        }
      }
    }
  }
`;
