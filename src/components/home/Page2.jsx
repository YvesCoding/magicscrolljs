/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

function Page2(props) {
  let {
    location,
    data: { allMdx },
  } = props;
  const isZhCN = utils.isZhCN(location.pathname);
  console.log(props);
  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>
          <FormattedMessage id="app.home.start" />
        </h2>
        <OverPack always={true} targetId="layout-panel">
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
            {allMdx.nodes.map((content, index) => (
              <MDXRenderer key={index}>{content.code.body}</MDXRenderer>
            ))}
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
