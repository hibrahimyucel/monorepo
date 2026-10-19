import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "SaaS Operations Hub",
  description: "Production Technical Manual",
  base: "/monorepo/", // Matches the structural GitHub Pages mirror pathing
  themeConfig: {
    logo: 'https://turbo.build',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'System Guidebook', link: '/alignment' }
    ],
    sidebar: [
      {
        text: 'Core Infrastructure Blueprint',
        items: [
          { text: 'Workspace Architecture Map', link: '/alignment' },
          { text: 'AlmaLinux Environment Ops', link: '/environment' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    footer: {
      message: 'Released under the MIT Workspace License.',
      copyright: 'Copyright © 2026-present Operations Team'
    }
  }
})
