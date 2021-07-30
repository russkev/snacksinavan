/* Groups all the objects in an array by a key
   Taken from: https://gist.github.com/mikaello/06a76bca33e5d79cdd80c162d7774e9c */
const groupBy = (keys) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => obj[key]).join("-");
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

/* Groups all the same snacks into an array and returns an array of arrays of
  all the snacks. Allows for easy quantity calculations. */
export default function groupSnacks(snacks) {
  // Group our snacks by their id
  const groupById = groupBy(["_id"]);
  let groupedById = groupById(snacks);

  // Convert this to an array so we can use JSX for looping
  let groupedArray = [];
  for (let o in groupedById) {
    groupedArray.push(groupedById[o]);
  }

  return groupedArray;
}
