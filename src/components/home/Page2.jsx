/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { FormattedMessage } from 'react-intl';
import * as utils from '../utils';

function Page2({ location }) {
  const isZhCN = utils.isZhCN(location.pathname);
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
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content"></QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}

export default Page2;
