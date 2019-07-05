import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React from 'react';

interface MdxProps {
  children: any;
}

export default function(props: MdxProps) {
  const { children } = props;
  const wrapper = (_: any) => {
    return <div className="markdown home-markdown">{_.children}</div>;
  };

  return <MDXRenderer components={{ wrapper }}>{children}</MDXRenderer>;
}
