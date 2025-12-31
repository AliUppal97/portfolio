import { render, screen } from '@testing-library/react'
import { SkillsMarqueeSection } from '@/components/sections/skills-marquee'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

describe('SkillsMarqueeSection', () => {
  it('renders skills marquee section', () => {
    render(<SkillsMarqueeSection />)

    const section = screen.getByLabelText('Technologies')
    expect(section).toBeInTheDocument()
  })

  it('renders technology logos', () => {
    render(<SkillsMarqueeSection />)

    // Check for technology names (using getAllByText since logos are duplicated)
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0)
    expect(screen.getAllByText('React').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
  })

  it('applies custom className', () => {
    const { container } = render(<SkillsMarqueeSection className="custom-class" />)

    const section = container.querySelector('section.custom-class')
    expect(section).toBeInTheDocument()
  })

  it('renders edge blur overlays', () => {
    const { container } = render(<SkillsMarqueeSection />)

    const overlays = container.querySelectorAll('[aria-hidden="true"]')
    expect(overlays.length).toBeGreaterThan(0)
  })

  it('duplicates logos for seamless loop', () => {
    render(<SkillsMarqueeSection />)

    // Should have duplicated logos (row = [...logos, ...logos])
    const nextJsElements = screen.getAllByText('Next.js')
    expect(nextJsElements.length).toBeGreaterThan(1)
  })
})

