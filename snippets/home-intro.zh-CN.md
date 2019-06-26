---
slug: snippet-test
---

import Demo from './home-intro.js'

<center>
 
 只需三步即可

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

3. 将内容包裹起来。

```js
<div className="demo-container">
  <Scrollbar>
    <div className="demo-content">
      <span className="demo-content-text">Hello! Magic Scroll!</span>
    </div>
  </Scrollbar>
</div>
```

4. 你将会得到下面的自定义滚动条。

<Demo />
