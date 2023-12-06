/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,

  additionalPaths: async (config) => {
    const result = [];

    // required value only
    result.push({ loc: "/login" });
    return result;
  },
};
