import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import TechList from '~/components/TechList/index-redux'
import { addTech } from '~/store/modules/techs/action'

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

  it('shold be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechList />)

    const dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
    fireEvent.submit(getByTestId('tech-form'))

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'))
  })
})
