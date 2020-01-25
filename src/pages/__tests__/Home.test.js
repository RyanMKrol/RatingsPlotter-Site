import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Home from './../Home'

// Render Tests

it('renders Home only when rendered', () => {
    const home = shallow(<Home />)
    expect(toJson(home)).toMatchSnapshot()
})

it('does not crash when rendered', () => {
    expect(() => mount(<Home />)).not.toThrow()
})
