import React from 'react'
// para renderizar em nossa Dom Fake
// fireEvent para disparo de eventos
import { render, fireEvent, cleanup } from '@testing-library/react'
import TechList from '~/components/TechList/index-simple'

describe('TechList component', () => {
  // antes de cada teste limpar o localStorage
  beforeEach(() => {
    localStorage.clear()
  })
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />)

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
    fireEvent.submit(getByTestId('tech-form'))

    const ul = getByTestId('tech-list')
    const li = getByText('Node.js')
    expect(ul).toContainElement(li)
    // espero que o input fique com valor vazio
    expect(getByLabelText('Tech')).toHaveValue('')
  })

  it('should store techs in storage', () => {
    const render1 = render(<TechList />)

    fireEvent.change(render1.getByLabelText('Tech'), {
      target: { value: 'Node.js' },
    })
    fireEvent.submit(render1.getByTestId('tech-form'))

    cleanup()

    const render2 = render(<TechList />)

    const ul = render2.getByTestId('tech-list')
    const li = render2.getByText('Node.js')

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techs',
      JSON.stringify(['Node.js'])
    )
    expect(ul).toContainElement(li)
  })
})
