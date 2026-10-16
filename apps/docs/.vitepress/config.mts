import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "SaaS Core Docs",
  description: "Monorepo Documentation Engine",
  base: "/my-saas-monorepo/", // Customized baseline mapping targeting Github Pages paths
  themeConfig: {
    nav: [
      { text: 'Home Base', link: '/' },
      { text: 'Guidebook', link: '/guide' }
    ],
    sidebar: [
      {
        text: 'Core Blueprint Documentation',
        items: [
          { text: 'Quick Initialization Guide', link: '/guide' }
        ]
      }
    ]
  }
})
