import { tool } from 'ai'
import { z } from 'zod'

/**
 * NPM Package Info Tool
 * Fetches package metadata from the npm registry.
 * 
 * Tool contract:
 * Name: getNpmPackageInfo
 * Input: { packageName: string }
 * Output: { name, version, description, weeklyDownloads, license, 
 *           homepage, author, repository }
 * Error: { error: string }
 */

// Return shape type
export interface NpmPackageResult {
  name: string
  version: string
  description: string
  weeklyDownloads: number
  license: string
  homepage: string | null
  author: string | null
  repository: string | null
}

export const getNpmPackageInfo = tool({
  description: `Fetches metadata about an npm package including version, 
    description, weekly downloads, license, and links. 
    Use this when the user asks about any npm package, library, or dependency.`,
  parameters: z.object({
    packageName: z
      .string()
      .describe('The exact npm package name, e.g. "react", "next", "zustand"'),
  }),
  execute: async ({ packageName }): Promise<NpmPackageResult> => {
    // Fetch package metadata
    const metaRes = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`,
      { next: { revalidate: 3600 } }
    )

    if (!metaRes.ok) {
      throw new Error(
        `Package "${packageName}" not found on npm registry (${metaRes.status})`
      )
    }

    const meta = await metaRes.json()

    // Fetch weekly download count
    let weeklyDownloads = 0
    try {
      const dlRes = await fetch(
        `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`
      )
      if (dlRes.ok) {
        const dlData = await dlRes.json()
        weeklyDownloads = dlData.downloads ?? 0
      }
    } catch {
      // downloads are nice-to-have, not required
    }

    // Extract author
    let author: string | null = null
    if (typeof meta.author === 'string') {
      author = meta.author
    } else if (meta.author?.name) {
      author = meta.author.name
    }

    // Extract repository URL
    let repository: string | null = null
    if (typeof meta.repository === 'string') {
      repository = meta.repository
    } else if (meta.repository?.url) {
      repository = meta.repository.url
        .replace('git+', '')
        .replace('.git', '')
        .replace('git://', 'https://')
    }

    return {
      name: meta.name ?? packageName,
      version: meta.version ?? 'unknown',
      description: meta.description ?? 'No description available',
      weeklyDownloads,
      license: meta.license ?? 'Unknown',
      homepage: meta.homepage ?? null,
      author,
      repository,
    }
  },
})
