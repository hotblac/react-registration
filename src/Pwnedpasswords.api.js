const sha1 = require('sha1');

/**
 * Check given password agains pwnedpasswords API.
 * @param password
 * @returns
 * @link https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 */
export const isPasswordPwned = (password) => {

    // Send  the first 5 digits of the hash to API
    const hash = sha1(password);
    const prefix = hash.substring(0,5); // First 5 characters of SHA-1 hash
    const suffix = hash.substring(5); // Remaining characters of SHA-1 hash

    return fetch('https://api.pwnedpasswords.com/range/' + prefix)
        .then(response => response.text()) // Response is plain text - 1 result per line
        .then(response => response.split(/\r?\n/)) // Make an array of results
        .then(lines => lines.map(line => line.split(':')[0].toLowerCase())) // Hash suffix is string up to colon
        .then(lines => lines.includes(suffix.toLowerCase()));
};
