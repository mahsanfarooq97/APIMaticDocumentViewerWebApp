import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Page = lazy(() => import("./components/Page"));
const HomePage = lazy(() => import("./views/Home"));
import { PageData } from "./redux/slice";

interface AppRoutesProps {
  pages: PageData[];
}

export default function AppRoutes({ pages }: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading</div>}>
            <HomePage />
          </Suspense>
        }
      />
      {pages?.map((page, index) => (
        <>
          <Route
            key={page?.title}
            path={`/${page?.title?.replace(/\s+/g, "-").toLowerCase()}`}
            element={
              <Suspense fallback={<div>Loading</div>}>
                <Page
                  index={index}
                  title={page?.title}
                  bodyText={page?.bodyText}
                />
              </Suspense>
            }
          />
        </>
      ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}
