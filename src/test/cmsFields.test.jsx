import { afterEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { cleanup, render, screen } from '@testing-library/react'
import App from '../App.jsx'
import { contentDefaults, pageFields } from '../contentDefaults.js'

/* Vitest runs from the project root. */
const publicDir = path.resolve('src/pages/public')

const pageFiles = fs
  .readdirSync(publicDir)
  .filter((name) => name.endsWith('.jsx') && name !== 'shared.jsx')

function referencesIn(fileName) {
  const source = fs.readFileSync(path.join(publicDir, fileName), 'utf8')
  const refs = []

  for (const match of source.matchAll(/useField\(\s*['"]([\w$]+)['"]\s*,\s*['"]([\w$]+)['"]\s*\)/g)) {
    refs.push({ page: match[1], field: match[2] })
  }

  for (const [, accessor, page] of source.matchAll(
    /const\s+([A-Za-z_$][\w$]*)\s*=\s*usePage\(\s*['"]([\w$]+)['"]\s*\)/g,
  )) {
    const call = new RegExp(`\\b${accessor}\\(\\s*['"]([\\w$]+)['"]\\s*\\)`, 'g')
    for (const match of source.matchAll(call)) {
      refs.push({ page, field: match[1] })
    }
  }

  return refs
}

const allReferences = pageFiles.flatMap((file) => referencesIn(file).map((ref) => ({ ...ref, file })))

describe('CMS field coverage', () => {
  it('reads a field definition for every reference on the public pages', () => {
    const missing = allReferences.filter(({ page, field }) => !contentDefaults.pages[page]?.[field])

    expect(missing).toEqual([])
  })

  it('lists every referenced field in the Content Manager page fields', () => {
    const unlisted = allReferences.filter(({ page, field }) => !pageFields[page]?.includes(field))

    expect(unlisted).toEqual([])
  })

  it('makes every public page depend on the CMS', () => {
    const perFile = Object.fromEntries(pageFiles.map((file) => [file, 0]))
    allReferences.forEach(({ file }) => {
      perFile[file] += 1
    })

    const bare = Object.entries(perFile).filter(([, count]) => count < 3)

    expect(bare).toEqual([])
    expect(allReferences.length).toBeGreaterThan(250)
  })
})

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('bundled content fallback', () => {
  it('renders the bundled defaults when Supabase is not configured', async () => {
    window.localStorage.setItem(
      'tms-app-store-v1',
      JSON.stringify({ content: { pages: { home: { heroTitle: { en: 'Saved hero' } } } } }),
    )
    window.location.hash = '#/'
    render(<App />)

    expect(await screen.findByText('Where Ancient Wisdom Awakens Modern Minds')).toBeInTheDocument()
    expect(screen.queryByText('Saved hero')).not.toBeInTheDocument()
    expect(screen.getByText('Welcome to the School & Monastery')).toBeInTheDocument()
  })
})

describe('language switch renders CMS translations', () => {
  it('shows Nepali content when lang is ne', async () => {
    window.localStorage.setItem('tms-lang', 'ne')
    window.location.hash = '#/'
    render(<App />)

    // heroTitle ne from basePages, heroKicker ne from src/content/home.js
    expect(await screen.findByText('बौद्ध शिक्षाको जीवन्त परम्परा संरक्षण गर्दै')).toBeInTheDocument()
    expect(screen.getByText('बौद्धनाथ · काठमाडौं · नेपाल')).toBeInTheDocument()
  })

  it('shows Tibetan content when lang is bo', async () => {
    window.localStorage.setItem('tms-lang', 'bo')
    window.location.hash = '#/'
    render(<App />)

    expect(
      await screen.findByText('ནང་བསྟན་སློབ་གཉེར་གྱི་གཞོན་ནུའི་སྲོལ་རྒྱུན་སྲུང་སྐྱོབ་བྱེད་བཞིན་པ།'),
    ).toBeInTheDocument()
    expect(screen.getByText('བོད་དཔལ་མཆོད་རྟེན། · ཀ་ཤུམ་དུ། · ལྷོ་བོད།')).toBeInTheDocument()
  })
})
