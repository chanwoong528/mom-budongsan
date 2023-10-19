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