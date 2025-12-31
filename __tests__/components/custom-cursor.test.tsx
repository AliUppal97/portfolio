import { render } from '@testing-library/react'
import { CustomCursor } from '@/components/custom-cursor'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
  useSpring: (value: any) => value,
}))

describe('CustomCursor', () => {
  it('renders custom cursor', () => {
    const { container } = render(<CustomCursor />)
    
    // Custom cursor should be rendered
    expect(container.firstChild).toBeInTheDocument()
  })
})

