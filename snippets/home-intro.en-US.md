---
slug: snippet-test
---

import Demo from './home-intro.js'

<center>

It only takes three steps.

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

3. Wrap the content.

```js
<div className="demo-container">
  <Scrollbar>
    <div className="demo-content">
      <span className="demo-content-text">Hello! Magic Scroll!</span>
    </div>
  </Scrollbar>
</div>
```

4. You will get the custom scrollbar below.

<Demo />
