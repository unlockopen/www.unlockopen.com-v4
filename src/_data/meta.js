export const url = process.env.URL || "http://localhost:8080";
export const siteName = "UnlockOpen";
export const siteDescription =
  "Helping organizations thrive in open tech ecosystems. Tobie Langel is a world-leading expert and international speaker on open source and standardization.";
export const siteType = "Person"; // schema
export const locale = "en_EN";
export const lang = "en";
export const skipContent = "Skip to content";
export const author = {
  name: "Tobie Langel", // i.e. Lene Saile - page / blog author's name. Must be set.
  avatar: "/favicon.png",
  email: "tobie@unlockopen.com", // i.e. hola@lenesaile.com - email of the author
  website: "https://unlockopen.com/", // i.e. https.://www.lenesaile.com - the personal site of the author
  mastodon: "https://mastodon.social/@tobie",
  twitter: "https://twitter.com/tobie/",
  linkedin: "https://www.linkedin.com/in/tobielangel/"
};
export const creator = {
  name: "Lene Saile", // i.e. Lene Saile - creator's (developer) name.
  email: "hola@lenesaile.com",
  website: "https://www.lenesaile.com",
  social: "https://front-end.social/@lene"
};
export const themeColor = "#E6F3F6"; //  Manifest: defines the default theme color for the application
export const themeBgColor = "#161717"; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default = "/assets/images/template/opengraph-default.jpg"; // fallback/default meta image
export const opengraph_default_alt =
  "Visible content: UnlockOpen. Helping organizations thrive in open tech ecosystems."; // alt text for default meta image
export const articles = {
  // RSS feed
  name: "Articles",
  description: "",
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    {
      title: "Atom Feed",
      url: "/feed.xml",
      type: "application/atom+xml"
    }
  ],
  // Tags
  tagSingle: "Tag",
  tagPlural: "Tags",
  tagMore: "More tags:",
  // pagination
  paginationLabel: "Articles",
  paginationPage: "Page",
  paginationPrevious: "Previous",
  paginationNext: "Next",
  paginationNumbers: true
};
export const details = {
  aria: "section controls",
  expand: "expand all",
  collapse: "collapse all"
};
export const navigation = {
  ariaTop: "Main",
  ariaBottom: "Complementary",
  ariaPlatforms: "Platforms",
  // activate alternative mobile menu with drawer
  drawerNav: false,
  navLabel: "Menu"
};
export const themeSwitch = {
  title: "Theme",
  light: "light",
  dark: "dark",
  initial: "select"
};
export const greenweb = {
  // this goues into src/common/greenweb.njk
  providers: {
    // if you want to add more than one, edit the array directly.
    domain: "netlify.com",
    service: "cdn"
  },
  credentials: {
    // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
    domain: "",
    doctype: "",
    url: ""
  }
};
export const viewRepo = {
  // this is for the view/edit on github link. The value in the package.json will be pulled in.
  allow: true,
  infoText: "View this page on GitHub"
};

export const cacheDurations = {
  hourly: "1h",
  daily: "23h",
  weekly: "167h",
  monthly: "671h"
};
