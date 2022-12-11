import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

const LandingPage = lazy(() => import("../pages/Public/LandingPage"));
const PageNotFound = lazy(() => import("../components/NoPageFound"));
const PageUnderConstruction = lazy(() =>
  import("../components/PageUnderConstruction")
);
const PreSignUp = lazy(() => import("../pages/Public/PreSignUp"));
const Dashboard = lazy(() => import("../pages/Public/Dashboard"));
const PreLogin = lazy(() => import("../pages/Public/PreLogin"));
const Shop = lazy(() => import("../pages/Public/Shop"));
const SubjectShop = lazy(() => import("../pages/Public/SubjectShop"));
const Cart = lazy(() => import("../pages/Public/Cart"));
const StudentEducationUpdate = lazy(() =>
  import("../pages/Public/StudentEducationUpdate")
);
const VerifyStudent = lazy(() => import("../pages/Public/VerifyStudent"));
const ResetPassword = lazy(() => import("../pages/Public/ResetPassword"));

// IELTS
const IELTSSignUp = lazy(() => import("../pages/IELTS/IELTSSignUp"));

// Tuition
const TuitionLogin = lazy(() => import("../pages/Tuition/Login"));
const TuitionPublic = lazy(() => import("../pages/Tuition/PublicView"));
const TuitionSignUp = lazy(() => import("../pages/Tuition/TuitionSignUp"));
const ChapterDashboard = lazy(() =>
  import("../pages/Tuition/ChapterDashboard")
);
const TopicDashboard = lazy(() => import("../pages/Tuition/TopicDashboard"));
const TopicWiseNotes = lazy(() => import("../pages/Tuition/TopicWiseNotes"));
const ExplanatoryVideo = lazy(() =>
  import("../pages/Tuition/ExplanatoryVideo")
);
const TopicWiseQPAP = lazy(() => import("../pages/Tuition/TopicWiseQPAP"));

// Admin
const AdminDash = lazy(() => import("../pages/Admin/Dashboard"));
const ManageAccess = lazy(() => import("../pages/Admin/ManageAccess"));
const ManageSubject = lazy(() => import("../pages/Admin/ManageSubject"));
const ManageChapter = lazy(() => import("../pages/Admin/ManageChapter"));
const ManageTopic = lazy(() => import("../pages/Admin/ManageTopic"));
const ManageAccount = lazy(() => import("../pages/Admin/ManageAccount"));
const AdminLogin = lazy(() => import("../pages/Admin/AdminLogin"));
const ManageStudent = lazy(() => import("../pages/Admin/ManageStudent"));
const ManageStudentSubject = lazy(() =>
  import("../pages/Admin/ManageStudent/manageSubjects")
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
                {/* Public */}
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/prelogin" element={<PreLogin />}></Route>
                <Route
                  path="/pageUnderConstruction"
                  element={<PageUnderConstruction />}
                ></Route>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route path="/shop" element={<SubjectShop />}></Route>
                <Route path="/shop/:name/:id" element={<Shop />}></Route>
                <Route path="/shop/cart" element={<Cart />}></Route>
                <Route
                  path="/student/eduUpdate"
                  element={<StudentEducationUpdate />}
                ></Route>
                <Route
                  path="/verify/student"
                  element={<VerifyStudent />}
                ></Route>
                <Route
                  path="/resetpassword/student"
                  element={<ResetPassword />}
                ></Route>
                <Route
                  path="/loader"
                  element={<Loader minHeight={"90vh"} />}
                ></Route>
                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />}></Route>
                <Route path="/adminDashboard" element={<AdminDash />}></Route>
                <Route
                  path="/admin/manageAccess"
                  element={<ManageAccess />}
                ></Route>
                <Route
                  path="/admin/manageSubject"
                  element={<ManageSubject />}
                ></Route>
                <Route
                  path="/admin/manageChapter"
                  element={<ManageChapter />}
                ></Route>
                <Route
                  path="/admin/manageTopic"
                  element={<ManageTopic />}
                ></Route>
                <Route
                  path="/admin/manageAccount"
                  element={<ManageAccount />}
                ></Route>
                <Route
                  path="/admin/manageStudent"
                  element={<ManageStudent />}
                ></Route>
                <Route
                  path="/admin/manageStudentChapter/:id"
                  element={<ManageStudentSubject />}
                ></Route>
                {/* Tuition */}
                <Route path="/tuition/login" element={<TuitionLogin />}></Route>
                <Route path="/tuition" element={<TuitionPublic />}></Route>
                <Route path="/preSignUp" element={<PreSignUp />}></Route>
                <Route
                  path="/signUp/Tuition"
                  element={<TuitionSignUp />}
                ></Route>
                <Route path="/signUp/IELTS" element={<IELTSSignUp />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route
                  path="/dashboard/student/:subject/:subjectId/chapters"
                  element={<ChapterDashboard />}
                ></Route>
                <Route
                  path="/dashboard/student/:subject/:subjectId/:chapter/:chapterId"
                  element={<TopicDashboard />}
                ></Route>
                <Route
                  path="/tuition/:subject/:subjectId/:chapter/:chapterId/topicWiseNotes"
                  element={<TopicWiseNotes />}
                ></Route>
                <Route
                  path="/tuition/:subject/:subjectId/:chapter/:chapterId/explanatoryVideo"
                  element={<ExplanatoryVideo />}
                ></Route>
                <Route
                  path="/tuition/:subject/:subjectId/:chapter/:chapterId/topicWiseQPAP"
                  element={<TopicWiseQPAP />}
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
