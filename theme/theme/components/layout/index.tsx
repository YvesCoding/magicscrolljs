import React from 'react';
import ReactDom from 'react-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  pageContext: {
    webConfig: any;
    slug: string;
  };
  data: {
    mdx: {
      frontmatter: any;
    };
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

interface LayoutState {
  pageHeight: number;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = {
      pageHeight: 0,
    };
  }

  render() {
    const {
      children,
      pageContext: { webConfig, slug },
      ...restProps
    } = this.props;

    const { locales } = webConfig;

    const { pageHeight } = this.state;
    return (
      <LocaleProvider locale={enUS}>
        <div
          className={`page-wrapper ${((!locales && slug == '/') ||
            Object.keys(locales).includes(slug)) &&
            'index-page-wrapper'}`}
        >
          <Header pageContext={{ webConfig, slug }} {...restProps} ref="header" />
          <div style={{ minHeight: pageHeight + 'px' }}>
            {React.cloneElement(children, {
              ...children.props,
              isMobile: restProps.isMobile,
            })}
          </div>
          <Footer {...restProps} ref="footer" />
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
