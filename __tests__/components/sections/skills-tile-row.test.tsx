import { render, screen } from '@testing-library/react'
import { SkillsTileRowSection } from '@/components/sections/skills-tile-row'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('SkillsTileRowSection', () => {
  it('renders skills tile row section', () => {
    render(<SkillsTileRowSection />)

    const section = screen.getByLabelText('Stacks and languages')
    expect(section).toBeInTheDocument()
  })

  it('renders technology tiles', () => {
    const { container } = render(<SkillsTileRowSection />)

    // Check for technology tiles by their titles
    const tiles = container.querySelectorAll('[title]')
    expect(tiles.length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(<SkillsTileRowSection className="custom-class" />)

    const section = container.querySelector('section.custom-class')
    expect(section).toBeInTheDocument()
  })

  it('renders edge blur overlays', () => {
    const { container } = render(<SkillsTileRowSection />)

    const overlays = container.querySelectorAll('[aria-hidden="true"]')
    expect(overlays.length).toBeGreaterThan(0)
  })

  it('duplicates tiles for seamless loop', () => {
    const { container } = render(<SkillsTileRowSection />)

    // Should have duplicated tiles (row = [...techTiles, ...techTiles])
    const tiles = container.querySelectorAll('[title="Next.js"]')
    expect(tiles.length).toBeGreaterThan(1)
  })
})

