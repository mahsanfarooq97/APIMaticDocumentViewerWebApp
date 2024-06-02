import Box from "@mui/material/Box";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./Routes";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPages } from "./redux/slice.jsx";

import { RootState, AppDispatch } from "./redux/store"; // Adjust the import based on your store file location

const drawerWidth = 240;

export default function App() {
  const pages = useSelector((state: RootState) => state.pageSlice.Pages);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPages());
  }, []);

  return (
    <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <SideMenu pages={pages} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <AppRoutes pages={pages} />
          </Box>
        </Box>
    </BrowserRouter>
  );
}
