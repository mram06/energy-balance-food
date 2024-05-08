export default function (item, filterName) {
  if (
    filterName &&
    !item.title.toLowerCase().includes(filterName.toLowerCase())
  )
    return false;
  return true;
}
