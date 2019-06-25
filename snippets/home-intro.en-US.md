---
slug: snippet-test
---

import Demo from './home-intro.js'

<center>

It only takes three steps to use `magic-scroll`.

</center>

1. Install `magic-scroll` via `yarn` or `npm`

```bash
npm install magic-scroll -S
# yarn add magic-scroll
```

2.  Import `magic-scroll`

```js
import Scrollbar from 'magic-scroll';
```

3. Wrap the content and you will see the effect.

```less
.demo-container {
  width: 100%;
  height: 100px;
}
.demo-content {
  position: relative;
  width: 100%;
  height: 500px;
  background: linear-gradient(0deg, #fff, #d5ffc1);
}
.demo-content-text {
  display: block;
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  color: #2c3e50;
  font-weight: 300;
}
```

```js
<div className="demo-container">
  <Scrollbar>
    <div className="demo-content">
      <span className="demo-content-text">Hello! Magic Scroll!</span>
    </div>
  </Scrollbar>
</div>
```

<Demo />
