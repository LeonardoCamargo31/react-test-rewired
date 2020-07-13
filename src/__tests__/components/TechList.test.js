import React from 'react'
// para renderizar em nossa Dom Fake
// fireEvent para disparo de eventos
import { render, fireEvent } from '@testing-library/react'
import TechList from '~/components/TechList'

// <button>Adicionar</button> usar o getByText

// <ul data-testid="name"></ul> getAllByTestId

describe('TechList component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, debug } = render(<TechList />)
    fireEvent.click(getByText('Adicionar'))

    debug()

    const ul = getByTestId('tech-list')
    const li = getByText('Node.js')
    expect(ul).toContainElement(li)
  })
})
