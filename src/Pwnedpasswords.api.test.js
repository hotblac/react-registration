import {isPasswordPwned} from "./Pwnedpasswords.api";

describe('isPasswordPwned', () => {

    const password = 'password';
    const uniquePassword = 'aPasswordNotInThePwnedList';

    /**
     * First 5 characters of SHA-1 hash of password
     * @type {string}
     */
    const expectedHashPrefix = '5baa6';

    /**
     * Partial response from API
     * https://api.pwnedpasswords.com/range/5baa6
     * @type {string}
     */
    const apiResponse = '1E2AAA439972480CEC7F16C795BBB429372:1\n' +
        '1E3687A61BFCE35F69B7408158101C8E414:1\n' +
        '1E4C9B93F3F0682250B6CF8331B7EE68FD8:3533661'; // This hash corresponds to 'password'

    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponseOnce(apiResponse);
    });

    it('requests pwned passwords by partial hash', () => {
        isPasswordPwned(password);
        expect(fetch.mock.calls[0][0]).toBe('https://api.pwnedpasswords.com/range/' + expectedHashPrefix);
    });

    it('returns true when password is pwned', async () => {
        const result = await isPasswordPwned(password);
        expect(result).toBe(true);
    });

    it('returns false when password is not pwned', async () => {
        const result = await isPasswordPwned(uniquePassword);
        expect(result).toBe(false);
    });
});