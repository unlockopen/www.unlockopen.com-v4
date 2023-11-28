---
title: Alert
layout: sg-wrapper
---

<seven-minute-tabs>
  <ol role="tablist" class="sg-tabs" aria-label="What does this tab chooser do?">
    <li><a href="#example-tab" role="tab">Demo</a></li>
		<li><a href="#usage-tab" role="tab">Usage</a></li>
    <li><a href="#html-tab" role="tab">HTML</a></li>
    <li><a href="#context-tab" role="tab">Context</a></li>
  </ol>

<div id="example-tab" role="tabpanel" class="iframe-container">
	<alert-l @headline="Error Alert" :@type="error" @raw="content"></alert-l>
</div>

  <div id="html-tab" role="tabpanel" class="sg-code sg-stretch">

```html
<alert-l @headline="Error Alert" :@type="error" @raw="content"></alert-l>
```

  </div>

    <div id="usage-tab" role="tabpanel" class="sg-code sg-stretch">

    &lt;alert-l @headline="Error Alert" :@type="error" @raw="content"></alert-l&gt;

</div>

  <div id="context-tab" role="tabpanel" class="sg-code sg-stretch">

context?

  </div>
</seven-minute-tabs>
