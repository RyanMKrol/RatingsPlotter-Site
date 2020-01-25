import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import AppRouter from './../AppRouter'

// Render Tests

it('renders router only when rendered', () => {
    const appRouter = shallow(<AppRouter />)
    expect(toJson(appRouter)).toMatchSnapshot()
})

it('does not crash when rendered', () => {
    expect(() => mount(<AppRouter />)).not.toThrow()
})
