const {sortPages} = require('./reports.js');
const {test, expect} = require('@jest/globals');

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 7,
        'https://wagslane.dev/path2': 1,
        'https://wagslane.dev/path5': 9,
        'https://wagslane.dev/path4': 2,
        'https://wagslane.dev/path3': 4
        

    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/path5', 9],
        ['https://wagslane.dev/path', 7],
        ['https://wagslane.dev/path3', 4],
        ['https://wagslane.dev/path4', 2],
        ['https://wagslane.dev/path2', 1]
    ];
    expect(actual).toEqual(expected);
});



test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
        

    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ];
    expect(actual).toEqual(expected);
});


test('sortPages null case', () => {
    const input = {}
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
  })