import { render, screen } from '@testing-library/react'
import { MainWrapper } from '@/components/main-wrapper'

describe('MainWrapper', () => {
  it('renders children', () => {
    render(
      <MainWrapper>
        <div>Test Content</div>
      </MainWrapper>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <MainWrapper className="custom-class">
        <div>Test</div>
      </MainWrapper>
    )
    
    const main = container.querySelector('main')
    expect(main).toHaveClass('custom-class')
  })
})

