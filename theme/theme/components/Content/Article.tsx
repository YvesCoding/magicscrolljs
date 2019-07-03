import React from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Affix } from 'antd';
import delegate from 'delegate';
import EditButton from './EditButton';
import { IFrontmatterData } from '../../templates/docs';
import moment from 'moment';
import AvatarList from './AvatarList';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

interface ArticleProps {
  content: {
    meta: IFrontmatterData;
    toc: {
      items: Array<{
        url: string;
        title: string;
      }>;
    };
    code: {
      body: string;
    };
  };
}

export default class Article extends React.PureComponent<ArticleProps> {
  static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  componentDidMount() {
    // Add ga event click
    this.delegation = delegate(
      this.node,
      '.resource-card',
      'click',
      (e: { delegateTarget: { href: any } }) => {
        if ((window as any).ga) {
          (window as any).ga('send', 'event', 'Download', 'resource', e.delegateTarget.href);
        }
      },
      false
    );
  }
  delegation: any;
  pingTimer: number;
  componentWillUnmount() {
    clearTimeout(this.pingTimer);
    if (this.delegation) {
      this.delegation.destroy();
    }
  }

  node: HTMLElement | null | undefined;

  render() {
    const props = this.props;
    const content = props.content;
    const { meta } = content;
    const { title, subtitle, path, modifiedTime, avatarList } = meta;
    const {
      intl: { locale },
    } = this.context as {
      intl: {
        locale: 'zh-CN' | 'en-US';
      };
    };
    return (
      <DocumentTitle title={`${title} - Magic Scroll`}>
        <>
          <article
            className="markdown"
            ref={node => {
              this.node = node;
            }}
          >
            <h1>
              {title}
              {!subtitle || locale === 'en-US' ? null : (
                <span className="subtitle">{subtitle}</span>
              )}
              <EditButton title="编辑文件" filename={path} />
            </h1>

            {!content.toc.items.length ? null : (
              <Affix
                className="toc-affix"
                offsetTop={16}
                target={() => {
                  return typeof window === 'undefined'
                    ? null
                    : document.getElementById('layout-panel');
                }}
              >
                <ul className="toc">
                  {content.toc.items.map(item => {
                    return (
                      <li key={item.url}>
                        <a href={item.url}>{item.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </Affix>
            )}
            <section className="markdown api-container">
              <MDXRenderer>{content.code.body}</MDXRenderer>
            </section>
          </article>
          <div className="modifiedTime">
            {/* <AvatarList avatarList={avatarList} /> */}
            上次修改时间
            {moment(modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
          </div>
        </>
      </DocumentTitle>
    );
  }
}
