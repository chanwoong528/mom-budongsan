import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../store/GlobalStore";
import { useSearchParams } from "react-router-dom";
import { fetchGetRentalList } from "../apis/apiGoogleSheet";
import { useReactToPrint } from "react-to-print";
import { isNumeric, formatNumberToKorean } from "../util/utilFunction";

import "./DetailPage.scss";

const DetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // 1
  const buildingName = searchParams.get("name");
  const { propertyList } = useContext(GlobalContext);
  const [targetBuilding, setTargetBuilding] = useState();
  const [rentalList, setRentalList] = useState([]);
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  useEffect(() => {
    if (propertyList.length > 0) {
      setTargetBuilding(
        propertyList.find((item) => item.명칭 === buildingName)
      );
      fetchGetRentalList(buildingName).then((list) => {
        setRentalList(list);
      });
    }
  }, [buildingName, propertyList.length]);

  return (
    <main>
      <button className="btn-print" onClick={handlePrint}>
        프린트
      </button>
      <div className="detail-page-main" ref={printRef}>
        <table className="heaer-table">
          <tbody>
            <tr>
              <th className="first-col">명칭</th>
              <td>{targetBuilding?.명칭}</td>
              <th>매매(의뢰)가격</th>
              <td>
                {targetBuilding?.의뢰가격 &&
                  formatNumberToKorean(targetBuilding?.의뢰가격)}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="building-table">
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <th className="first-col" rowSpan={9}>
                부동산의표시
              </th>
              <th>소재지</th>
              <td colSpan={5}>{targetBuilding?.소재지}</td>
            </tr>
            <tr>
              <th rowSpan={3}>토지</th>
              <th rowSpan={2}>대지면적</th>
              <th>
                m<sup>2</sup>
              </th>
              <th>평</th>
              <th>지목</th>
              <th>대</th>
            </tr>
            <tr>
              <td>{targetBuilding?.토지면적}</td>
              <td>{(Number(targetBuilding?.토지면적) * 0.3025).toString()}</td>
              <td>{targetBuilding?.지목}</td>
              <td>{targetBuilding?.대}</td>
            </tr>
            <tr>
              <th>용도지역</th>
              <td colSpan={2}>{targetBuilding?.용도지역}</td>
              <th>도로</th>
              <td>{targetBuilding?.도로}</td>
            </tr>
            <tr>
              <th rowSpan={5}>건물</th>
              <th rowSpan={2}>연면적</th>
              <th>
                m<sup>2</sup>
              </th>
              <th>평</th>
              <th rowSpan={2}>층수</th>
              <td rowSpan={2}>{targetBuilding?.층수}</td>
            </tr>
            <tr>
              <td>{targetBuilding?.건물연면적}</td>
              <td>
                {(Number(targetBuilding?.건물연면적) * 0.3025).toString()}
              </td>
            </tr>
            <tr>
              <th>사용승인</th>
              <td colSpan={2}>{targetBuilding?.사용승인날짜}</td>
              <th>EVT</th>
              <td>{targetBuilding?.EVT}</td>
            </tr>
            <tr>
              <th>주용도</th>
              <td colSpan={2}>{targetBuilding?.주용도}</td>
              <th>주차장</th>
              <td>{targetBuilding?.주차장}</td>
            </tr>
            <tr>
              <th>위치</th>
              <td colSpan={4}>{targetBuilding?.위치}</td>
            </tr>
          </tbody>
        </table>
        <table className="rent-table">
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <th className="first-col" rowSpan={2}>
                매매 현황
              </th>
              <th>조정가</th>
              <td>{targetBuilding?.조정가}</td>
              <th>보증금</th>
              {/* <td>{targetBuilding?.보증금}</td> */}
              <th>월세</th>
              <td>{targetBuilding?.조정가}</td>
            </tr>
            <tr>
              <th>대출금</th>
              <td>{targetBuilding?.대출금}</td>
              <th>부가세</th>
              <td>{targetBuilding?.부가세}</td>
              <th>관리비</th>
              <td>{targetBuilding?.관리비}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col className="half-col"></col>
            <col className="half-col"></col>
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
          <tbody>
            <tr>
              <th className="first-col" rowSpan={rentalList.length + 2}>
                임대 현황
              </th>
              <th rowSpan={2}>층별</th>
              <th rowSpan={2}>용도</th>
              <th colSpan={2}>면적</th>
              <th rowSpan={2}>보증금</th>
              <th rowSpan={2}>월차임</th>
              <th rowSpan={2}>비고</th>
            </tr>
            <tr>
              <th>면적 평</th>
              <th>
                면적 m<sup>2</sup>
              </th>
            </tr>
            {rentalList.map((rent) => {
              return (
                <tr key={rent.층별}>
                  <td>{rent.층별}</td>
                  <td>{rent.용도}</td>
                  <td>{parseInt(rent.면적 * 0.3025).toString()}</td>
                  <td>{rent.면적}</td>
                  <td>{rent.보증금}</td>
                  <td>{rent.월차임}</td>
                  <td>{rent.비고}</td>
                </tr>
              );
            })}
            <tr className="tr-total">
              <th>총계</th>
              <td></td>
              <td></td>
              <td>
                {rentalList.length > 0 &&
                  parseInt(
                    rentalList?.reduce((accumulator, currentValue) => {
                      return accumulator + Number(currentValue.면적);
                    }, 0) * 0.3025
                  ).toString()}
              </td>
              <td>
                {rentalList.length > 0 &&
                  parseInt(
                    rentalList.reduce((accumulator, currentValue) => {
                      return accumulator + Number(currentValue.면적);
                    }, 0)
                  ).toString()}
              </td>

              <td>
                {rentalList.length > 0 &&
                  parseInt(
                    rentalList
                      .filter((item) => isNumeric(item.보증금))
                      .reduce((accumulator, currentValue) => {
                        return accumulator + Number(currentValue.보증금);
                      }, 0)
                  ).toString()}
              </td>
              <td>
                {rentalList.length > 0 &&
                  parseInt(
                    rentalList
                      .filter((item) => isNumeric(item.월차임))
                      .reduce((accumulator, currentValue) => {
                        return accumulator + Number(currentValue.월차임);
                      }, 0)
                  ).toString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default DetailPage;
