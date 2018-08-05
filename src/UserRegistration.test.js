import React from 'react';
import { shallow } from 'enzyme';
import {UserRegistration} from "./UserRegistration";
import * as pwn from "./Pwnedpasswords.api";

const username = 'username';
const goodPassword = 'password';
const pwnedPassword = "pwned";

// Mock behaviours
pwn.isPasswordPwned = jest.fn((pwd) => {
    return Promise.resolve(pwd !== goodPassword)
});
const onSubmit = jest.fn();

beforeEach(() => {
    onSubmit.mockReset();
});

describe('password field', () =>  {

    it('should show warnings when password is pwned', async () => {
        const wrapper = shallow(<UserRegistration/>);
        await setFieldValuesAndUpdate(wrapper, username, pwnedPassword, pwnedPassword);

        const inputField = wrapper.find('#passwordField input');
        const errorIcon = wrapper.find('#passwordField .icon');

        expect(inputField.hasClass('is-danger')).toBe(true);
        expect(errorIcon.exists()).toBe(true);
    });

    it ('should hide warnings when password is blank', () => {
        const wrapper = shallow(<UserRegistration/>);
        setFieldValues(wrapper, username, '', '');

        const inputField = wrapper.find('#passwordField input')
        const errorIcon = wrapper.find('#passwordField .icon');

        expect(inputField.hasClass('is-danger')).toBe(false);
        expect(errorIcon.exists()).toBe(false);
    });

    it ('should hide warnings when password is not pwned', async () => {
        const wrapper = shallow(<UserRegistration/>);
        await setFieldValuesAndUpdate(wrapper, username, goodPassword, goodPassword);

        const inputField = wrapper.find('#passwordField input')
        const errorIcon = wrapper.find('#passwordField .icon');

        expect(inputField.hasClass('is-danger')).toBe(false);
        expect(errorIcon.exists()).toBe(false);
    });

});

describe('password confirmation field', () =>  {

    it('should show warnings when password does not match confirmation', () => {
        const wrapper = shallow(<UserRegistration/>);
        setFieldValues(wrapper, username, goodPassword, 'mismatch');

        const inputField = wrapper.find('#confirmField input')
        const errorIcon = wrapper.find('#confirmField .icon');

        expect(inputField.hasClass('is-danger')).toBe(true);
        expect(errorIcon.exists()).toBe(true);
    });

    it('should hide warnings when password does matches confirmation', () => {
        const wrapper = shallow(<UserRegistration/>);
        setFieldValues(wrapper, username, goodPassword, goodPassword);

        const inputField = wrapper.find('#confirmField input')
        const errorIcon = wrapper.find('#confirmField .icon');

        expect(inputField.hasClass('is-danger')).toBe(false);
        expect(errorIcon.exists()).toBe(false);
    });

});

describe('submit button', () =>  {

    it ('should disable submit when username is blank', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, '', goodPassword, goodPassword);

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });

    it('should disable submit when password and confirmation are blank', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, '', '');

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });

    it('should disable submit when password does not match confirmation', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, goodPassword, 'mismatch');

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });

    it('should disable submit when password is pwned', async () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        await setFieldValuesAndUpdate(wrapper, username, pwnedPassword, pwnedPassword);

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeTruthy();

        // Try submitting anyway
        submitButton.simulate('click');
        expect(onSubmit).not.toBeCalled();
    });

    it('should enable submit when all fields are valid', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, goodPassword, goodPassword);

        const submitButton = wrapper.find('button');
        expect(submitButton.prop('disabled')).toBeFalsy();

        submitButton.simulate('click');
        expect(onSubmit).toBeCalled();
    });

});

describe ('callbacks', () => {

    it('should notify caller of username and password', () => {
        const wrapper = shallow(<UserRegistration onSubmit={onSubmit}/>);
        setFieldValues(wrapper, username, goodPassword, goodPassword);

        const submitButton = wrapper.find('button');
        submitButton.simulate('click');

        expect(onSubmit).toBeCalledWith(username, goodPassword);
    });

});

function setFieldValues(wrapper, username, password, confirm) {
    const usernameField = wrapper.find('#usernameField input');
    const passwordField = wrapper.find('#passwordField input');
    const confirmField = wrapper.find('#confirmField input');

    usernameField.simulate('change', stubEvent(usernameField, username));
    passwordField.simulate('change', stubEvent(passwordField, password));
    confirmField.simulate('change', stubEvent(confirmField, confirm));
}


async function setFieldValuesAndUpdate(wrapper, username, password, confirm) {
    setFieldValues(wrapper, username, password, confirm);
    await flushPromises();
    wrapper.update();
}

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
}

function flushPromises() {
    return new Promise(resolve => setImmediate(resolve));
}
