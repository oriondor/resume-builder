export function useResume() {
  function removeItem(object: any[], index: number) {
    const objectIndex = object.findIndex((item) => item.index === index);
    object.splice(objectIndex, 1);
    object.forEach((item, index) => ({ ...item, index }));
  }

  return {
    removeItem,
  };
}
