const manifest = require('./src/manifest');

module.exports = {
  siteMetadata: {
    title: '95 Recipes',
    description: 'Recipes in a vintage way',
    siteUrl: 'http://localhost:8000',
  },
  plugins: [
    {
      resolve: '@react95/gatsby-theme',
      options: {
        contentPath: 'content',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: manifest,
    },
    'gatsby-plugin-offline',
  ],
};
