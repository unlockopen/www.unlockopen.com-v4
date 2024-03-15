---
permalink: 'articles/{% if pagination.pageNumber >=1  %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
title: 'Articles'
description: 'All blog posts can be found here'
layout: archive
pagination:
  data: collections.articles
  size: 6
theme: golden
decorative:
  shape: sun
  settings: '--decorative-height: 50rem'
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et odio et massa aliquam tincidunt eget ac odio. Mauris non tempor massa, ac consectetur.
