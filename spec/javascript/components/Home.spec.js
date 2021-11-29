import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import Home from 'components/Home'

configure({ adapter: new Adapter() });

describe('Home', () => {
    const props = {}
    const component = shallow(<Home {...props} />)

    it('renders Home component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
