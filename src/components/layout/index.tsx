import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import enLocale from '../../locale/en-US';
import cnLocale from '../../locale/zh-CN';
import * as utils from '../utils';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';
import Scrollbar, { GlobarBarOptionsContext } from 'magic-scroll';

interface LayoutProps {
  location: {
    pathname: string;
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

interface LayoutState {
  appLocale: {
    locale: any;
    messages: any;
  };
  contentHeight: Number;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    const { pathname } = props.location;
    const appLocale = utils.isZhCN(pathname) ? cnLocale : enLocale;
    addLocaleData(appLocale.data);
    this.state = {
      appLocale,
      contentHeight: 0,
    };
  }

  render() {
    const { children, location, ...restProps } = this.props;
    const { pathname } = location;
    const { appLocale, contentHeight } = this.state;
    return (
      <GlobarBarOptionsContext.Provider
        value={{
          barBg: '#1890ff',
        }}
      >
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <LocaleProvider locale={enUS}>
            <Scrollbar style={{ height: contentHeight }}>
              <div
                className={`page-wrapper ${(pathname === '/' || pathname === 'index-cn') &&
                  'index-page-wrapper'}`}
              >
                <Header {...restProps} location={location} />
                {React.cloneElement(children, {
                  ...children.props,
                  isMobile: restProps.isMobile,
                })}
                <Footer {...restProps} location={location} />
              </div>
            </Scrollbar>
          </LocaleProvider>
        </IntlProvider>
      </GlobarBarOptionsContext.Provider>
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
      contentHeight: window.innerHeight,
    });
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
