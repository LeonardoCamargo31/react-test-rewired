import React from 'react'
import { useSelector } from 'react-redux'
import { render } from '@testing-library/react'
import TechList from '~/components/TechList/index-redux'

jest.mock('react-redux')

describe('TechList component', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation((callback) =>
      // simulando carregar o reducer techs
      callback({
        techs: ['Node.js', 'ReactJS'],
      })
    )

    const { getByTestId, getByText } = render(<TechList />)
    const ul = getByTestId('tech-list')

    expect(ul).toContainElement(getByText('Node.js'))
    expect(ul).toContainElement(getByText('ReactJS'))
  })
})
