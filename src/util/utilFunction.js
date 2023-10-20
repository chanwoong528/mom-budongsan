
export function convertToKeyValue(data) {
  const keys = data[0];
  return data.slice(1).map((entry) => {
    const obj = {};
    entry.forEach((value, index) => {
      obj[keys[index] || index] = value;
    });
    return obj;
  });
}

export function formatNumberToKorean(number) {
  if (number >= 10000) {
    const units = ['천', '만', '억', '조', '경']; // Adjust this array for larger numbers if needed
    let unitIndex = 0;

    while (number >= 10000) {
      number /= 10000;
      unitIndex++;
    }

    return Math.floor(number) + units[unitIndex];
  }

  return number.toString();
}

export function isNumeric(str) {
  return /^\d+$/.test(str);
}