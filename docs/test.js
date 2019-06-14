import React from 'react';
import Scrollbar from 'magic-scroll';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const expample = `
<div className="parent-dom">
 <Scrollbar> 
  <div className="child-dom"></div> 
  </Scrollbar> 
</div>
`.trim();

export default () => {
  return (
    <LiveProvider code={expample} scope={{ Scrollbar }}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};
