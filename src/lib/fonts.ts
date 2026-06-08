const GOOGLE_FONTS_METADATA = '/api/google-fonts-metadata'

function toCss2Family(family: string) {
  return family.trim().replace(/\s+/g, '+')
}

export async function fetchGoogleFontFamilies(): Promise<string[]> {
  const response = await fetch(GOOGLE_FONTS_METADATA)
  if (!response.ok) {
    throw new Error(`Cannot load fonts metadata (${response.status})`)
  }

  const text = await response.text()
  const json = text.replace(/^\)\]\}'/, '')
  const data = JSON.parse(json) as {
    familyMetadataList?: Array<{ family: string }>
  }

  return (
    data.familyMetadataList
      ?.map((item) => item.family)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b)) ?? []
  )
}

export function mountGoogleFont(family: string): void {
  const id = `font-${family.replace(/\s+/g, '-').toLowerCase()}`

  if (document.getElementById(id)) {
    return
  }

  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${toCss2Family(family)}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}
