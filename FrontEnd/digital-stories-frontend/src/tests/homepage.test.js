import React from 'react'
import { render } from '@testing-library/react'
import Homepage from '../components/Homepage'
jest.mock("axios");
test('Renders No Stories heading if there is no story', () => {
  const { getByText } = render(<Homepage />)

  const heading = getByText('No Stories...')

  expect(heading).toBeInTheDocument()
})

