import React from 'react';
import ReactDom from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import * as utils from '../utils';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';
import Scrollbar from 'magic-scroll';
import { graphql } from 'gatsby';

export const contentContext = React.createContext(0);

interface LayoutProps {
  location: {
    pathname: string;
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

interface LayoutState {
  pageHeight: number;
  contentHeight: number;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    const { pathname } = props.location;
    this.state = {
      pageHeight: 0,
      contentHeight: 0,
    };
  }

  render() {
    const { children, location, ...restProps } = this.props;
    const { pathname } = location;
    const { pageHeight, contentHeight } = this.state;
    return (
      <LocaleProvider locale={enUS}>
        <div
          className={`page-wrapper ${(pathname === '/' || pathname === 'index-cn') &&
            'index-page-wrapper'}`}
        >
          <Scrollbar
            scrollingX={false}
            style={{ height: pageHeight + 'px' }}
            barBg="#1890ff"
            railCls="page-rail"
            ref="scrollbar"
            renderPanel={this.renderPanel}
          >
            <Header {...restProps} location={location} ref="header" />
            <div style={{ minHeight: contentHeight + 'px' }}>
              <contentContext.Provider value={contentHeight}>
                {React.cloneElement(children, {
                  ...children.props,
                  isMobile: restProps.isMobile,
                })}
              </contentContext.Provider>
            </div>
            <Footer {...restProps} location={location} ref="footer" />
          </Scrollbar>
        </div>
      </LocaleProvider>
    );
  }

  componentDidMount() {
    this.ajustScrollbarHeight();
    window.addEventListener('resize', this.ajustScrollbarHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.ajustScrollbarHeight);
  }

  ajustScrollbarHeight = () => {
    this.setState({
      pageHeight: window.innerHeight,
      contentHeight:
        window.innerHeight -
        this.getDomByRef('header').offsetHeight -
        this.getDomByRef('footer').offsetHeight,
    });
  };

  getDomByRef = (ref: 'header' | 'footer'): HTMLDivElement => {
    return ReactDom.findDOMNode(this.refs[ref]) as HTMLDivElement;
  };

  renderPanel = (props: any) => {
    const mergeProps = { ...props, id: 'layout-panel' };
    return <div {...mergeProps}></div>;
  };
}

const WrapperLayout = (props: LayoutProps) => (
  <Media query="(max-width: 996px)">
    {isMobile => {
      const isNode = typeof window === `undefined`;
      return <Layout {...props} isMobile={isMobile && !isNode} />;
    }}
  </Media>
);
export default WrapperLayout;
