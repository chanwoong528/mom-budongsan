import React, { useContext } from "react";
import { GlobalContext } from "../store/GlobalStore";
import BuildingItem from "../components/ListItem/BuildingItem";

const ListPage = () => {
  const { propertyList } = useContext(GlobalContext);

  return (
    <main>
      ListPage
      {propertyList.length > 0 && (
        <ul>
          {propertyList.map((item, idx) => {
            return <BuildingItem key={item.명칭 + idx} buildingItem={item} />;
          })}
        </ul>
      )}
    </main>
  );
};

export default ListPage;
