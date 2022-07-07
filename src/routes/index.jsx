import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const PageNotFound = lazy(() => import("../components/NoPageFound"));

const Routing = () => {
  return (
    <div>
      <Suspense fallback={<Loader minHeight={"90vh"} />}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routing;
