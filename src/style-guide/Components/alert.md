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
	<custom-alert @headline="Error Alert" :@type="error" @raw="content">This is the Alert content</custom-alert>
</div>

  <div id="html-tab" role="tabpanel" class="sg-code sg-stretch">

```html
<custom-alert @headline="Error Alert" :@type="error" @raw="content">
  This is the Alert content</custom-alert
>
```

  </div>

    <div id="usage-tab" role="tabpanel" class="sg-code sg-stretch">

    &lt;custom-alert @headline="Error Alert" :@type="error" @raw="content"> This is the Alert content &lt;/custom-alert&gt;

</div>

  <div id="context-tab" role="tabpanel" class="sg-code sg-stretch">

context?

  </div>
</seven-minute-tabs>
