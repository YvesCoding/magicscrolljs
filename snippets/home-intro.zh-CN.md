---
slug: snippet-test
---

import Demo from './home-intro.js'

<center>

使用`magic-scroll`只需三步即可

</center>

1. 通过`npm`或者`yarn`安装`magic-scroll`

```bash
npm install magic-scroll -S
# yarn add magic-scroll
```

2.  引入`magic-scroll`

```js
import Scrollbar from 'magic-scroll';
```

3. 将内容包裹起来, 你将会看到结果。

js:

```js
<div className="demo-container">
  <Scrollbar>
    <div className="demo-content">
      <span className="demo-content-text">Hello! Magic Scroll!</span>
    </div>
  </Scrollbar>
</div>
```

less:

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

<Demo />
