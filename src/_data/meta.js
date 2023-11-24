module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'UnlockOpen',
  siteDescription:
    'Eleventy starter based on the workflow suggested by buildexcellentwebsit.es.',
  siteType: 'website',
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'Tobie Langel',
  authorEmail: 'tobie@unlockopen.com',
  authorWebsite: 'https://unlockopen.com/',
  themeColor: '#E6F3F6',
  themeBgColor: '#161717',
  ogDefault: '/assets/images/opengraph-default.jpg', // fallback/default meta image
  ogDefaultAlt:
    'Visible content: Eleventy starter based on workflow for Cube CSS, Every Layout, Design Tokens and Tailwind for uitility, based on the concepts explained in buildexcellentwebsit.es ',
  twitterProfile: 'https://twitter.com/tobie/',
  mastodonProfile: 'https://mastodon.social/@tobie',
  gitHubProfile: 'https://github.com/unlockopen',
  blog: {
    // this is for the rss feed
    name: 'UnlockOpen Thinking',
    description:
      'Tell the word what you are writing about in your blog! It will show up on feed readers.'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    // edit all presets or leave empty. They are being used in the pages for privacy.md and imprint.md
    firma: 'Organization name',
    street: '123 Main St.',
    city: 'Ciudad',
    state: 'Estado',
    zip: '12345',
    mobileDisplay: '+34 1234567',
    mobileCall: ' +341234567',
    email: 'hola@yoursite.com',
    cif: ''
  },
  menu: {
    closedText: 'Menu'
  }
};
