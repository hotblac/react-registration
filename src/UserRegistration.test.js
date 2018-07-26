import React from 'react';
import { shallow } from 'enzyme';
import {UserRegistration} from "./UserRegistration";

describe ('<UserRegistration/>', () => {
    it('renders', () => {
        const wrapper = shallow(<UserRegistration />);
        expect(wrapper).toBeDefined();
    });
});
