import { convertToKeyValue } from "../util/utilFunction";

export const fetchGetBuildingList = async () => {
  try {
    const fetchBuilding = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1tthIvY7MaVSZ7jANeUNj6mC5rktSCTWw6xY1LlmrjA4/values/건물이름?key=AIzaSyB-AsYxya9rZQNpIQ6X-NFUd7d5eXRJpEg")
    const buildingsData = await fetchBuilding.json();
    const keyValueBuildingList = convertToKeyValue(buildingsData.values)

    return keyValueBuildingList;

  } catch (error) {

    console.warn("")
  }
}

export const fetchGetRentalList = async (buildingName) => {
  try {
    const fetchRental = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1tthIvY7MaVSZ7jANeUNj6mC5rktSCTWw6xY1LlmrjA4/values/건물임대현황?key=AIzaSyB-AsYxya9rZQNpIQ6X-NFUd7d5eXRJpEg")
    const rentalListData = await fetchRental.json();
    // console.log(convertToKeyValue(rentalListData.values).filter(item => item.명칭 === buildingName))
    const keyValueRentalList = convertToKeyValue(rentalListData.values).filter(item => item.명칭 === buildingName)

    return keyValueRentalList;
  } catch (error) {
    console.warn("")
  }
}

