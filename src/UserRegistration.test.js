import React from 'react';
import { shallow } from 'enzyme';
import {UserRegistration} from "./UserRegistration";

describe ('<UserRegistration/>', () => {

    const username = 'username';
    const password = 'password';
    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockReset();
    });


    it('renders', () => {
        const wrapper = shallow(<UserRegistration/>);
        expect(wrapper).toBeDefined();
    });


    it('notifies caller of username and password', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, password, password);

        const submitButton = wrapper.find('button');
        submitButton.simulate('click');

        expect(onSubmit).toBeCalledWith(username, password);
    });


    it('disables submit when password does not match confirmation', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, password, 'mismatch');

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });


    it('enables submit when password matches confirmation', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, password, password);

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeFalsy();

        submitButton.simulate('click');
        expect(onSubmit).toBeCalled();
    });


    it('disables submit when password and confirmation are blank', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, '', '');

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });

    it('shows error markers when password does not match confirmation', () => {
        const wrapper = shallow(<UserRegistration/>);
        setFieldValues(wrapper, username, password, 'mismatch');

        const inputField = wrapper.find('#confirmField input')
        const errorIcon = wrapper.find('#confirmField .icon');

        expect(inputField.hasClass('is-danger')).toBe(true);
        expect(errorIcon.exists()).toBe(true);
    });

    it('hides error marker when password does matches confirmation', () => {
        const wrapper = shallow(<UserRegistration/>);
        setFieldValues(wrapper, username, password, password);

        const inputField = wrapper.find('#confirmField input')
        const errorIcon = wrapper.find('#confirmField .icon');

        expect(inputField.hasClass('is-danger')).toBe(false);
        expect(errorIcon.exists()).toBe(false);
    });


    function setFieldValues(wrapper, username, password, confirm) {
        const usernameField = wrapper.find('#usernameField input');
        const passwordField = wrapper.find('#passwordField input');
        const confirmField = wrapper.find('#confirmField input');

        usernameField.simulate('change', stubEvent(usernameField, username));
        passwordField.simulate('change', stubEvent(passwordField, password));
        confirmField.simulate('change', stubEvent(confirmField, confirm));
    }
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
