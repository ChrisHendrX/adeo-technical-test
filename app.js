const json = require('./data');

// Slice the arguments to get all the custom arguments
const commandLineArgs = process.argv.slice(2);

// Create object containing all of the args
// The _ attribute will contain all the arguments without double dashes

const argv = { _: [] };

commandLineArgs.forEach(arg => {
  // If the argument contains double dashes
  if (arg.substring(0, 2) === '--') {
    // Split the whome argument with the delimiter '=' to get the name and the value
    const spliitedArg = arg.substring(2).split('=');
    const obj = { [spliitedArg[0]]: spliitedArg[1] || true };
    // Create new property on the argv object with the name of the argument, and assign its value
    // if there's no value , it will be true by default
    Object.assign(argv, obj);
  } else {
    // Add this argument in the default ones (_)
    Object.assign(argv, { _: [...argv._, arg] });
  }
});

// Pure function which filter the animals with the given parameter
function filterAnimals(countries, find) {
  // Ensure that the find param is a string
  find = typeof find === 'string' ? find : '';

  return countries.reduce((acc, country) => {
    const people = country.people.reduce((acc, person) => {
      const animals = person.animals.filter(animal =>
        animal.name.includes(find)
      );
      return animals.length > 0
        ? acc.concat(Object.assign({}, person, { animals }))
        : acc;
    }, []);
    return people.length > 0
      ? acc.concat(Object.assign({}, country, { people }))
      : acc;
  }, []);
}

// Pure function which renames each parent name with the count of its children
function countChildren(countries) {
  return countries.map(country => ({
    name: `${country.name} [${country.people.length}]`,
    people: country.people.map(person => ({
      name: `${person.name} [${person.animals.length}]`,
      animals: person.animals
    }))
  }));
}

// Handle --filter argument
if (argv.filter) {
  const filtered = filterAnimals(json.data, argv.filter);
  console.log('---- filtered----\n', JSON.stringify(filtered));
}

// Handle --count argument
if (argv.count) {
  const arrayWithCounts = countChildren(json.data);
  console.log('---- countChildren ----\n', JSON.stringify(arrayWithCounts));
}

module.exports = {
  filterAnimals,
  countChildren
};