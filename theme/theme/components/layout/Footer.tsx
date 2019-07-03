/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import * as utils from '../utils';
class Footer extends React.Component<{
  location: {
    pathname: string;
  };
}> {
  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname))
      );
  };

  render() {
    return (
      <footer id="footer">
        <div className="bottom-bar">
          Made with <span className="heart">❤</span> by
          <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/afx/blog">
            公司
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
