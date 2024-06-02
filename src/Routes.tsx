// AppRoutes.tsx

import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PageData } from "./redux/slice";

const Page = lazy(() => import("./components/Page"));
const HomePage = lazy(() => import("./views/Home"));

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
        <Route
          key={`${page.title}-${index}`}
          path={`/${page.title?.replace(/\s+/g, "-").toLowerCase()}`}
          element={
            <Suspense fallback={<div>Loading</div>}>
              <Page
                key={`${page.title}-${index}`}
                index={index}
                title={page.title}
                bodyText={page.bodyText}
              />
            </Suspense>
          }
        />
      ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}
