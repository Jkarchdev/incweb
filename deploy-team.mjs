#!/usr/bin/env node
/**
 * Deploy a team's submitted design as a standalone Cloudflare Pages site.
 * Usage: node deploy-team.mjs <team-name>
 */

import { createClient } from '@supabase/supabase-js'
import { execSync } from 'child_process'
import { writeFileSync, copyFileSync, existsSync, renameSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const teamName = process.argv[2]
if (!teamName) {
  console.error('Usage: node deploy-team.mjs <team-name>')
  process.exit(1)
}

const SUPABASE_URL = 'https://klreatquddzaqastpbcz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtscmVhdHF1ZGR6YXFhc3RwYmN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzkyNDMsImV4cCI6MjA4NjE1NTI0M30.xW1NwzCYmEIYi22ld2qof8jRAYL8W_QDm4GiGkt_aNU'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sanitize team name for use as a Cloudflare Pages project name
const projectName = teamName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

console.log(`\n🔍 Fetching design for team: "${teamName}"`)
const { data, error } = await supabase
  .from('submissions')
  .select('design_data')
  .eq('team_name', teamName)
  .single()

if (error || !data) {
  console.error('❌ Error fetching design:', error?.message || 'Not found')
  process.exit(1)
}

console.log('✅ Design data fetched')

// Write design data to JSON file for the build to consume
const dataPath = join(__dirname, 'team-site-data.json')
writeFileSync(dataPath, JSON.stringify(data.design_data))
console.log('📝 Written team-site-data.json')

// Build the site
console.log('\n🔨 Building site...')
execSync('npx vite build --config vite.config.site.ts', { stdio: 'inherit', cwd: __dirname })

// Rename site.html -> index.html so Cloudflare Pages serves it as the default
const distSite = join(__dirname, 'dist-site')
renameSync(join(distSite, 'site.html'), join(distSite, 'index.html'))

// Add _redirects for SPA routing
writeFileSync(join(distSite, '_redirects'), '/* /index.html 200\n')

// Copy public assets (e.g. heights-logo.png) into dist-site
const heightsLogo = join(__dirname, 'dist', 'heights-logo.png')
if (existsSync(heightsLogo)) {
  copyFileSync(heightsLogo, join(distSite, 'heights-logo.png'))
}

// Create the Pages project if it doesn't exist
console.log(`\n📁 Ensuring Cloudflare Pages project "${projectName}" exists...`)
const createRes = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/8300a9c5bc3748d82e31662329ea05eb/pages/projects`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: projectName, production_branch: 'main' }),
  }
)
const createJson = await createRes.json()
if (createJson.success) {
  console.log(`✅ Project created`)
} else if (createJson.errors?.some(e => e.code === 8000007 || String(e.message).toLowerCase().includes('already exists'))) {
  console.log(`ℹ️  Project already exists, continuing...`)
} else {
  console.error('⚠️  Project creation response:', JSON.stringify(createJson.errors))
}

// Deploy to Cloudflare Pages
console.log(`\n🚀 Deploying as "${projectName}"...`)
execSync(
  `npx wrangler pages deploy dist-site --project-name ${projectName} --branch main --commit-dirty=true`,
  {
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: '8300a9c5bc3748d82e31662329ea05eb' }
  }
)

console.log(`\n✅ Done! Site live at: https://${projectName}.pages.dev`)
