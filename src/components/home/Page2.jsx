/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

function getNode(slug, allMdx) {
  const slugCN = slug + '-cn';

  const rtn = {
    zh: {},
    en: {},
  };

  rtn.en = allMdx.nodes.find(n => {
    return slug == n.fields.slug;
  });

  rtn.zh = allMdx.nodes.find(n => {
    return slugCN == n.fields.slug;
  });

  return rtn;
}

function Page2(props) {
  let {
    location,
    data: { allMdx },
  } = props;
  const isZhCN = utils.isZhCN(location.pathname);
  const mdxNode = getNode('/snippets/home-intro', allMdx);
  const finalNode = isZhCN ? mdxNode.zh : mdxNode.en;
  const wrapper = props => {
    return <div className="markdown home-markdown">{props.children}</div>;
  };

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
            <MDXRenderer components={{ wrapper }} key="render">
              {finalNode.code.body}
            </MDXRenderer>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
