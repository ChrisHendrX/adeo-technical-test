const { data } = require('./data');

// Create an object containing all of the args, the arguments without double dashes will be automatically removed

const argv = process.argv.slice(2) // Slice the arguments to get all the custom arguments
.reduce((acc, arg) => {
  if (!arg.startsWith('--')) return acc;
  const [key, value = true] = arg.substring(2).split('=');
  return {...acc, [key]: value };
}, {});

// Pure function which filters the animals with the given value
const filterAnimals = (countries, find) => {
  // Ensure that the find param is a string
  find = typeof find === 'string' ? find : '';
  if (!find && countries) return countries;
  return countries.reduce((acc, country) => {
    const people = country.people.reduce((acc, person) => {
      const filteredAnimals = person.animals.filter(animal => animal.name.includes(find));
      return filteredAnimals.length > 0 ? [...acc, {...person, animals: [...filteredAnimals]}] : acc;
    }, []);
    return people.length > 0 ? [...acc, { ...country, people }] : acc;
  }, []);
}

// Pure function which renames each parent name with the count of its children
const countChildren = (countries) => {
  return countries.map(country => ({
    name: `${country.name} [${country.people.length}]`,
    people: country.people.map(person => ({
      ...person,
      name: `${person.name} [${person.animals.length}]`
    }))
  }));
}

// Execute the command
const result = Object.keys(argv).reduce((acc, arg) => {
  if (arg === 'filter') return filterAnimals(acc, argv.filter);
  if (arg === 'count') return countChildren(acc);
  return acc;
}, [...data]);

if (Object.keys(argv).length > 0) console.log(JSON.stringify(result));

module.exports = {
  filterAnimals,
  countChildren
};