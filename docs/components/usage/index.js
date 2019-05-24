import React from "react"
import Scrollbar from "magic-scroll"
import "./index.scss"

export const Usage = () => {
  return (
    <div className="parent-dom">
      <Scrollbar keepBarShow>
        <div className="child-dom" />
      </Scrollbar>
    </div>
  )
}
