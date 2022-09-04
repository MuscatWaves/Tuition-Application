import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const PageNotFound = lazy(() => import("../components/NoPageFound"));
const Login = lazy(() => import("../pages/Login"));
const PreSignUp = lazy(() => import("../pages/PreSignUp"));
const IELTSSignUp = lazy(() => import("../pages/IELTSSignUp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

// Tuition
const TuitionPublic = lazy(() => import("../pages/Tuition/PublicView"));
const TuitionSignUp = lazy(() => import("../pages/Tuition/TuitionSignUp"));
const SubjectDashboard = lazy(() =>
  import("../pages/Tuition/SubjectDashboard")
);

//  Routing Function
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
                <Route path="/tuition" element={<TuitionPublic />}></Route>
                <Route path="/preSignUp" element={<PreSignUp />}></Route>
                <Route
                  path="/signUp/Tuition"
                  element={<TuitionSignUp />}
                ></Route>
                <Route path="/signUp/IELTS" element={<IELTSSignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route
                  path="/dashboard/:subject"
                  element={<SubjectDashboard />}
                ></Route>
                <Route
                  path="/loader"
                  element={<Loader minHeight={"90vh"} />}
                ></Route>
              </Routes>
            </LazyMotion>
          </AnimatePresence>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routing;
