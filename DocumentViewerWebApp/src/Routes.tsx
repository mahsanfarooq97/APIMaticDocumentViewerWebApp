import { Navigate, Route, Routes } from "react-router-dom";
import Page from "./components/Page";
interface Page {
  title: string;
  bodyText: string;
}

interface AppRoutesProps {
  pages: Page[];
}
export default function AppRoutes({ pages }: AppRoutesProps) {
    // The Regex is to Replace whitespaces with - and make a correct path.
  return (
    <Routes>
      {pages?.map((page) => (
        <Route
        key={page?.title}
          path={`/${page?.title?.replace(/\s+/g, "-").toLowerCase()}`}
          element={<Page title={page?.title} text={page?.bodyText} />}
        />
      ))}
      {/* ! For Default Route to Open. */}
      <Route
        path="*"
        element={
          <Navigate
            to={`/${pages[0]?.title?.replace(/\s+/g, "-").toLowerCase()}`}
            replace
          />
        }
      />
    </Routes>
  );
}
