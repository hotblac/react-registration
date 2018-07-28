import React from 'react';
import { shallow } from 'enzyme';
import {UserRegistration} from "./UserRegistration";

describe ('<UserRegistration/>', () => {

    const username = 'username';
    const password = 'password';
    const onSubmit = jest.fn();

    it('renders', () => {
        const wrapper = shallow(<UserRegistration/>);
        expect(wrapper).toBeDefined();
    });

    it('notifies caller of username and password', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        const usernameField = wrapper.find('input.username');
        const passwordField = wrapper.find('input.password');
        const submitButton = wrapper.find('button');

        usernameField.simulate('change', stubEvent(usernameField, username));
        passwordField.simulate('change', stubEvent(passwordField, password));
        submitButton.simulate('click');

        expect(onSubmit).toBeCalledWith(username, password);
    });
});

/**
 * Stubbed event object suitable for event simulatrion.
 * As we use shallow rendering, we don't get real DOM events.
 * This assumes that we use the named input handler pattern:
 * @link https://reactjs.org/docs/forms.html#handling-multiple-inputs
 */
function stubEvent(node, value) {
    const name = node.prop('name');
    return {target: {
        name: name,
        value: value
    }};
};
