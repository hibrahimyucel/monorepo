import { defineConfig } from 'vitepress'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const baseLayoutPath = isGitHubActions ? '/my-saas-monorepo/' : '/docs/';

export default defineConfig({
  title: "SaaS Operations Hub",
  description: "Production Technical Manual",
  base: baseLayoutPath,
  cleanUrls: true, // .html uzantılarını URL'den kaldırır
  themeConfig: {
    logo: 'https://turbo.build',
    nav: [
      { text: 'Manual Home', link: '/' },
      { text: 'System Guidebook', link: '/alignment' },
      { text: 'Lexicon Database', link: '/glossary/' } // Klasör sonu slash ile biter
    ],
    sidebar: [
      {
        text: 'Core Infrastructure Blueprint',
        items: [
          { text: 'Workspace Architecture Map', link: '/alignment' },
          { text: 'AlmaLinux Environment Ops', link: '/environment' },
          { text: 'Rate limiing', link: '/telemetry-spec' }
        ]
      },
      {
        text: 'Academic Terminology Lexicon',
        items: [
          { text: 'Glossary Index Catalog', link: '/glossary/' },
          { text: 'Term: AlmaLinux OS', link: '/glossary/almalinux' },
          { text: 'Term: VitePress Static Framework', link: '/glossary/vitepress' }
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
