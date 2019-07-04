/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'gatsby';
import * as utils from '../utils';
import { Row, Col, Icon, Select, Input, Menu, Button, Modal, Popover } from 'antd';

interface HeaderProps {
  isMobile: boolean;
  pageContext: {
    webConfig: any;
    slug: string;
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
    const {
      pageContext: { webConfig, slug },
    } = this.props;
    const localtes = webConfig.themeConfig.locales;
    let currentLocates = utils.getCurrentLoacle(localtes, slug);

    let {
      themeConfig: { nav = [] },
      title,
    } = utils.getCurrentWebConfigBySlug(webConfig, slug);
    const activeMenuItem = nav.filter((item: any) => {
      return item.link && item.link.startsWith(slug);
    });

    const menu = [
      <Menu mode={menuMode} selectedKeys={activeMenuItem} id="nav" key="nav">
        {nav.map((item: any) => {
          return (
            <Menu.Item key={item.link}>
              <Link to={item.link}>{item.text}</Link>
            </Menu.Item>
          );
        })}
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
              {title}
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
                <Button size="small">语言</Button>
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
