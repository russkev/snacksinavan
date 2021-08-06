/* Groups all the objects in an array by a key
   Taken from: https://gist.github.com/mikaello/06a76bca33e5d79cdd80c162d7774e9c */
const groupBy = (keys) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = keys.map((key) => obj[key]).join("-");
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

// // From:
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
// const groupBy = (objectArray, property) => {
//   // const sortedObjects = objectArray.sort((a, b) => a[property] - b[property])
//   // return sortedObjects.filter((object, index, array) => {
//   //   return !index || object[property] !== array[index-1][property]
//   // })


//   return objectArray.reduce(function (accumulator, object) {
//     let key = object[property]
//     // if (accumulator.filter(item => item[property] === key).length === 0) {
//     //   accumulator.push(object)
//     // }


//     if (!accumulator[key]) {
//       accumulator[key] = []
//     }
//     accumulator[key].push(object)
//     return accumulator;
//   })
// }

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

  // const groupedArray = groupBy(snacks, "_id")
  // console.log(groupedArray)
  // const returnArray = groupedArray.keys().reduce((accumulator, snackKey) => {
  //   return accumulator.concat(snacks["_id"])
  // })

  // console.log(returnArray);

  return groupedArray;
}
