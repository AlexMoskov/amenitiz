import React from 'react'
import axios from 'axios'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import Purchases from 'components/Purchases'

configure({ adapter: new Adapter() });
jest.mock('axios')

describe('Purchases', () => {
    const props = {}
    const component = shallow(<Purchases {...props} />)

    it('renders Purchases component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
