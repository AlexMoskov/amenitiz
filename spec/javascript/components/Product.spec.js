import React from 'react'
import axios from 'axios'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import Product from 'components/Product'

configure({ adapter: new Adapter() });
jest.mock('axios')

describe('Product', () => {
    const props = {
        match: {
            params: {
                id: 1001
            }
        }
    }
    const component = shallow(<Product {...props} />)

    it('renders Product component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
