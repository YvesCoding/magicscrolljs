import React from 'react';
import DocumentTitle from 'react-document-title';

import Banner from './Banner';
import Features from './Features';

function Home(props) {
  return (
    <DocumentTitle title="Magic Scroll">
      <div className="home-wrapper">
        <Banner {...props} />
        <Features {...props} />
      </div>
    </DocumentTitle>
  );
}

export default Home;
