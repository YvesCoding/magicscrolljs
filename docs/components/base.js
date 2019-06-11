import React from "react"
import Scrollbar from "magic-scroll"
import "./base.scss"

const Base = (props = {}) => {
  return (
    <div className="parent-dom">
      <Scrollbar {...props}>
        <div className="child-dom" />
      </Scrollbar>
    </div>
  )
}

export default Base
