const { randomPickUnique } = require('../../lib/meeseeks');

describe('randomPickUnique', ()=>{

  test('Should pick one value and return in array format.', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10];
    const result = randomPickUnique(arr);
    const isArray = Array.isArray(result);

    expect(isArray).toEqual(true);
    expect(arr.includes(result[0])).toEqual(true);
    expect(result.length).toEqual(1);
  });

  test('Should pick 3 different values and return in array format.', () => {
    const arr = [1,2,3,4,5,6,7,8,9,10];
    const result = randomPickUnique(arr, 3);
    const isArray = Array.isArray(result);

    expect(isArray).toEqual(true);
    expect(arr.includes(result[0])).toEqual(true);
    expect(arr.includes(result[1])).toEqual(true);
    expect(arr.includes(result[2])).toEqual(true);
    expect(result[0]).not.toEqual(result[1]);
    expect(result[0]).not.toEqual(result[2]);
    expect(result[1]).not.toEqual(result[2]);
    expect(result.length).toEqual(3);
  });
});