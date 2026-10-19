import { defineConfig } from 'vitepress'

// Dynamically check if the build is running inside GitHub CI Actions
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const baseLayoutPath = isGitHubActions ? '/my-saas-monorepo/' : '/docs/';

export default defineConfig({
  title: "SaaS Operations Hub",
  description: "Production Technical Manual",
  base: baseLayoutPath, // Dynamically maps out pathing for both platforms symmetrically
  themeConfig: {
    logo: 'https://turbo.build',
    nav: [
      { text: 'Manual Home', link: '/' },
      { text: 'System Guidebook', link: isGitHubActions ? '/my-saas-monorepo/alignment' : '/docs/alignment' },
      { text: 'Lexicon Database', link: isGitHubActions ? '/my-saas-monorepo/glossary/' : '/docs/glossary/' }
    ],
    sidebar: [
      {
        text: 'Core Infrastructure Blueprint',
        items: [
          { text: 'Workspace Architecture Map', link: isGitHubActions ? '/my-saas-monorepo/alignment' : '/docs/alignment' },
          { text: 'AlmaLinux Environment Ops', link: isGitHubActions ? '/my-saas-monorepo/environment' : '/docs/environment' }
        ]
      },
      {
        text: 'Academic Terminology Lexicon',
        items: [
          { text: 'Glossary Index Catalog', link: isGitHubActions ? '/my-saas-monorepo/glossary/' : '/docs/glossary/' },
          { text: 'Term: AlmaLinux OS', link: isGitHubActions ? '/my-saas-monorepo/glossary/almalinux' : '/docs/glossary/almalinux' },
          { text: 'Term: VitePress Static Framework', link: isGitHubActions ? '/my-saas-monorepo/glossary/vitepress' : '/docs/glossary/vitepress' }
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
