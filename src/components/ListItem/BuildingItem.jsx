import React from "react";

import { formatNumberToKorean } from "../../util/utilFunction";

import { LIST_VIEW_COLUMNS } from "../../util/CONSTANT.JS";

const BuildingItem = ({ buildingItem }) => {
  const renderValue = (col, item) => {
    switch (col.format) {
      case "currency":
        return formatNumberToKorean(Number(buildingItem[col.keyName]));
      case "area":
        return Number(buildingItem[col.keyName]) * 0.3025 + "평";
      default:
        return item[col.keyName];
    }
  };

  return (
    <li key={buildingItem.명칭}>
      <a href={`/detail?name=${buildingItem.명칭}`}>
        <section>
          {LIST_VIEW_COLUMNS.map((col, idx) => {
            return col.type === "h3" ? (
              <h3 key={col.keyName + idx}>{buildingItem[col.keyName]}</h3>
            ) : (
              <p key={col.keyName + idx}>
                {col.keyName}:{renderValue(col, buildingItem)}
              </p>
            );
          })}
        </section>
      </a>
    </li>
  );
};

export default BuildingItem;
