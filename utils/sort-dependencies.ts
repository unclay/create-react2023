export default function sortDependencies(packageJson) {
<<<<<<< HEAD
  const sorted = {};

  const depTypes = [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ];

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {};
=======
  const sorted = {}

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {}
>>>>>>> b988996d413af7fe0290d17aa26e54d4661dd8c0

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
<<<<<<< HEAD
          sorted[depType][name] = packageJson[depType][name];
        });
=======
          sorted[depType][name] = packageJson[depType][name]
        })
>>>>>>> b988996d413af7fe0290d17aa26e54d4661dd8c0
    }
  }

  return {
    ...packageJson,
<<<<<<< HEAD
    ...sorted,
  };
}
=======
    ...sorted
  }
}
>>>>>>> b988996d413af7fe0290d17aa26e54d4661dd8c0
