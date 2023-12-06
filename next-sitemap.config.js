/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,

  additionalPaths: () => {
    const paths = [{ loc: "/login" }];
    return paths;
  },
};
