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
  query queryHomeInfo($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        heroImage
        actionText
        actionLink
        features {
          details
          title
        }
      }
      code {
        body
      }
    }
  }
`;
