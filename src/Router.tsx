//@ts-nocheck
import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/404/NotFoundPage";


import { GlobalContext, GET_BUILDING_LIST } from "./store/GlobalStore";
import { fetchGetBuildingList } from "./apis/apiGoogleSheet";

const Router = () => {
  const { globalDispatch } = useContext(GlobalContext);

  useEffect(() => {
    fetchGetBuildingList().then((propertyList) => {
      globalDispatch({ type: GET_BUILDING_LIST, payload: { propertyList } })
    });

  }, [])

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
