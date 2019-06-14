import React from 'react';
import Scrollbar from 'magic-scroll';
export default () => {
  return (
    <div className="parent-dom">
      <Scrollbar>
        <div className="child-dom"></div>
      </Scrollbar>
    </div>
  );
};
