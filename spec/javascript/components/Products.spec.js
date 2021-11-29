import React from 'react'
import axios from 'axios'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import Products from 'components/Products'

configure({ adapter: new Adapter() });
jest.mock('axios')

describe('Products', () => {
    const props = {}
    const component = shallow(<Products {...props} />)

    it('renders Products component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
