import React from 'react'
import axios from 'axios'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import Cart from 'components/Cart'

configure({ adapter: new Adapter() });
jest.mock('axios')

describe('Cart', () => {
    const props = {}
    const component = shallow(<Cart {...props} />)

    it('renders Cart component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
