const generateRandomNumberInRange = (max, min = 0) => Math.round(Math.random() * (max - min)) + min

const getRandomElementFromList = (list) => {
  const randomIndex = generateRandomNumberInRange(0, list.length - 1)
  return list ? list[randomIndex] : null
}

export { generateRandomNumberInRange, getRandomElementFromList }