/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const featuresCN = [
  {
    title: '功能丰富',
    content: '可以自定义滚动条，滚动轨道，滚动容器等。有丰富的API和事件',
  },
  {
    title: '使用简单',
    content: '每个属性都是可选的，只需要包裹内容即可出现自定义滚动条',
  },
  {
    title: '兼容性良好',
    content: '兼容TypeSciprt、 SSR、 PC、移动端、触屏',
  },
];

const featuresEN = [
  {
    title: 'Rich Function',
    content: 'You can customize scrollbar, rail, scroll container, etc. Rich APIs and Events',
  },
  {
    title: 'Easy To Use',
    content:
      'Each property is optional, and a custom scrollbar can appear just by wrapping the content',
  },
  {
    title: 'Good compatibility',
    content: 'Compatible with TypeSciprt, SSR, PC, mobile phone, touch screen',
  },
];

class Page1 extends React.PureComponent {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hoverNum: null,
    };
  }

  render() {
    const { intl } = this.props;
    let children = [[]];
    const isZh = intl.locale === 'zh-CN';
    (isZh ? featuresCN : featuresEN).forEach((item, i) => {
      const child = (
        <li key={i.toString()}>
          <div className="page1-box">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </li>
      );
      children[Math.floor(i / 3)].push(child);
    });

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 200, (children.length - 1 - i) * 200]}
        component="ul"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          <h2>
            <span>{isZh ? '特点' : 'Features'}</span>
          </h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          <OverPack targetId="layout-panel">{children}</OverPack>
        </div>
      </div>
    );
  }
}

export default injectIntl(Page1);
