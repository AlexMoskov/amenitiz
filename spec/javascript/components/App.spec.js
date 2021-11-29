import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from 'components/App'

configure({ adapter: new Adapter() });

describe('App', () => {
    const props = {}
    const component = shallow(<App {...props} />)

    it('renders App component', () => {
        expect(toJson(component)).toMatchSnapshot()
    })
})
