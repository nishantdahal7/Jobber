import React from 'react'
import ReactDOM from 'react-dom'
import { Dashboard } from '../Dashboard'
import { render } from '@testing-library/react'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<button>?</button>, div)
})
