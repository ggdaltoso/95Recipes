const manifest = require('./src/manifest');

module.exports = {
  siteMetadata: {
    title: '95 Recipes',
    description: 'Recipes in a vintage way',
    siteUrl: 'https://95recipes.ggdaltoso.dev/',
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
