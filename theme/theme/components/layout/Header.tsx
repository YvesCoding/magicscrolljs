/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'gatsby';
import * as utils from '../utils';
import { Row, Col, Icon, Select, Input, Menu, Button, Modal, Popover } from 'antd';

const { Option } = Select;

const LOGO_URL = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const key = 'antd-pro@2.0.0-notification-sent';

let docSearch: (config: any) => void;
if (typeof window !== 'undefined') {
  docSearch = require('docsearch.js'); // eslint-disable-line
}

function initDocSearch(locale: 'zh-CN' | 'en-US') {
  if (!docSearch) {
    return;
  }
  const lang = locale === 'zh-CN' ? 'cn' : 'en';
  docSearch({
    apiKey: 'dfba5eddecb719460b9fd232af57748d',
    indexName: 'pro_ant_design',
    inputSelector: '#search-box input',
    algoliaOptions: { facetFilters: [`tags:${lang}`] },
    transformData(
      hits: Array<{
        url: string;
      }>
    ) {
      hits.forEach(hit => {
        hit.url = hit.url.replace('ant.design.pro', window.location.host); // eslint-disable-line
        hit.url = hit.url.replace('https:', window.location.protocol); // eslint-disable-line
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

interface HeaderProps {
  isMobile: boolean;
  location: {
    pathname: string;
  };
}
interface HeaderState {
  inputValue?: string;
  menuVisible: boolean;
  menuMode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
  searchOption?: any[];
  searching?: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    inputValue: undefined,
    menuVisible: false,
    menuMode: 'horizontal',
  };

  searchInput: Input | null | undefined;

  componentDidMount() {
    const { searchInput } = this;
    document.addEventListener('keyup', event => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput && searchInput.focus();
      }
    });
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }
  }
  timer: number;
  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleSelect = (value: string) => {
    window.location.href = value;
  };

  onVersionChange = (value: string) => {
    if (value === 'v1') {
      window.open('https://v1.pro.ant.design/');
    }
    if (value === 'v2') {
      window.open('https://v2-pro.ant.design/');
    }
  };
  render() {
    const { menuMode, menuVisible } = this.state;
    const { location } = this.props;
    const path = location.pathname;

    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (/^blog/.test(path)) {
      activeMenuItem = 'blog';
    } else if (/docs/.test(path)) {
      activeMenuItem = 'docs';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }

    const menu = [
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home">
          {/* <Link to={utils.getLocalizedPathname('/' )}>首页</Link> */}
        </Menu.Item>
        <Menu.Item key="docs">
          {/* <Link to={utils.getLocalizedPathname('/docs/getting-started', isZhCN)}>文档</Link> */}
        </Menu.Item>
      </Menu>,
    ];

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <Link id="logo" to="/">
              {/* <img src={LOGO_URL} alt="logo" />
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/tNoOLUAkyuGLXoZvaibF.svg"
                alt="Ant Design Pro"
              /> */}
              MagicScroll.js
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div id="search-box">
              <Icon type="search" className="search-icon" />
              <Input
                ref={ref => {
                  this.searchInput = ref;
                }}
              />
            </div>
            <div className="header-meta">
              <div className="right-header">
                <div id="lang">
                  <Button size="small">语言</Button>
                </div>
              </div>
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
