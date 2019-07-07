/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import * as utils from '../utils';
class Footer extends React.Component<{
  data: {
    mdx: {
      frontmatter: any;
    };
  };
}> {
  render() {
    const {
      data: {
        mdx: { frontmatter },
      },
    } = this.props;

    console.log(frontmatter);

    return (
      <footer id="footer">
        <div className="bottom-bar">{frontmatter.footer}</div>
      </footer>
    );
  }
}

export default Footer;
