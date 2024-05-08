export default function (itemsList) {
  let newObj = {
    breakfast: [],
    main: [],
    salad: [],
    soup: [],
    pasta: [],
    croissant: [],
    dessert: [],
  };
  itemsList.forEach((item) => {
    newObj[item.category].push(item);
    console.log(newObj[item.category]);
  });
  return newObj;
}
