import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const PageNotFound = lazy(() => import("../components/NoPageFound"));
const Login = lazy(() => import("../pages/Login"));
const Tuition = lazy(() => import("../pages/Tuition"));

const Routing = () => {
  return (
    <div>
      <Suspense fallback={<Loader minHeight={"90vh"} />}>
        <Router>
          <AnimatePresence>
            <LazyMotion features={domAnimation}>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route path="/tuition" element={<Tuition />}></Route>
              </Routes>
            </LazyMotion>
          </AnimatePresence>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routing;
