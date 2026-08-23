import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { NpmPackageCard } from '@/components/tools/NpmPackageCard'
import { NpmPackageResult } from '@/tools/npmPackage'

const mockPackage: NpmPackageResult = {
  name: 'zustand',
  version: '5.0.15',
  description: 'Bear necessities for state management in React',
  weeklyDownloads: 52500000,
  license: 'MIT',
  homepage: 'https://zustand-demo.pmnd.rs/',
  author: 'Paul Henschel',
  repository: 'https://github.com/pmndrs/zustand',
}

describe('NpmPackageCard', () => {
  it('renders package name', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(screen.getByText('zustand')).toBeInTheDocument()
  })

  it('renders package version', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(screen.getByText('v5.0.15')).toBeInTheDocument()
  })

  it('renders package description', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(
      screen.getByText('Bear necessities for state management in React')
    ).toBeInTheDocument()
  })

  it('renders formatted weekly downloads', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(screen.getByText('52.5M')).toBeInTheDocument()
  })

  it('renders license', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(screen.getByText('MIT')).toBeInTheDocument()
  })

  it('renders homepage link', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(
      screen.getByRole('link', { name: /homepage/i })
    ).toHaveAttribute('href', 'https://zustand-demo.pmnd.rs/')
  })

  it('renders npm link', () => {
    render(<NpmPackageCard data={mockPackage} />)
    expect(
      screen.getByRole('link', { name: /view on npm/i })
    ).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/zustand'
    )
  })

  it('renders dash when weekly downloads is 0', () => {
    render(
      <NpmPackageCard
        data={{ ...mockPackage, weeklyDownloads: 0 }}
      />
    )
    expect(screen.getByText('—')).toBeInTheDocument()
  })
})
