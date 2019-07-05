import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import MdxRender from '../mdx/render';

export default function(props) {
  const {
    data: {
      mdx: { code },
    },
  } = props;

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <OverPack always={true} targetId="layout-panel">
          <QueueAnim key="queue" type="bottom" leaveReverse className="page2-content">
            <MdxRender key="render">{code.body}</MdxRender>
          </QueueAnim>
        </OverPack>
      </div>
    </div>
  );
}
