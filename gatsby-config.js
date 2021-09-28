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
      options: {
        name: '95 Recipes',
        short_name: '95Recipes',
        theme_color: '#000e7a',
        background_color: '#55aaaa',
        display: 'standalone',
        orientation: 'portrait',
        description: 'Recipes in a vintage way',
        start_url: '/',
        icon: 'static/images/icons/icon-512x512.png',
        cache_busting_mode: 'none',
        splash_pages: null,
        screenshots: [
          {
            src: '/images/screenshots/home.png',
            sizes: '1080x1920',
            label: 'Consulte as mais deliciosas receitas',
            type: 'image/png',
          },
          {
            src: '/images/screenshots/full_recipe.png',
            sizes: '1080x1920',
            label: 'Veja os ingredientes e como fazer',
            type: 'image/png',
          },
          {
            src: '/images/screenshots/picture.png',
            sizes: '1080x1920',
            platform: 'windows',
            label: 'Confira o resultado final',
            type: 'image/png',
          },
        ],
      },
    },
  ],
};
