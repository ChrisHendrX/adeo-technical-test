const data = require('../data').data;
const { test1, test2 } = require('./mocks');
const { filterAnimals, countChildren } = require('../app');

describe('filter arg', () => {
  test('should throw an error if data is not an array', () => {
    expect(() => {
      filterAnimals(null);
    }).toThrow();
  });

  test('should return the initial data if the filter value is empty', () => {
    expect(filterAnimals(data, '')).toEqual(data);
  });

  test('should return the initial data if the filter value is not a string', () => {
    expect(filterAnimals(data, null)).toEqual(data);
  });

  test('should return one country with one person owning an animal named "Deer Mouse"', () => {
    expect(filterAnimals(data, 'Deer Mouse')).toEqual(test1);
  });

  test('should return an empty array if the given animal name does not exist', () => {
    expect(filterAnimals(data, 'Unicorn')).toEqual([]);
  });

  test('should return an array of animals whose name contains the string "ry"', () => {
    expect(filterAnimals(data, 'ry')).toEqual(test2);
  });
});

describe('count arg', () => {
  test('should throw an error if data is not an array', () => {
    expect(() => {
      countChildren(null);
    }).toThrow();
  });

  test('should return an array with the same length as the initial data', () => {
    const withCount = countChildren(data);
    expect(withCount.length).toEqual(data.length);
  });
  
  test('should return every parent name with the count of its children into square brackets', () => {
    const withCount = countChildren(data);
    expect(withCount[0].name).toEqual(
      `${data[0].name} [${data[0].people.length}]`
    );
    expect(withCount[0].people[0].name).toEqual(
      `${data[0].people[0].name} [${data[0].people[0].animals.length}]`
    );
  });
});