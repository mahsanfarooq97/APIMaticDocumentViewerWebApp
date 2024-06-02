import Box from "@mui/material/Box";
import SideMenu from "./components/SideMenu";
import AppRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./redux/store"; // Adjust the import based on your store file location
import { useEffect } from "react";
import { getPages } from "./redux/slice";

const drawerWidth = 240;

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const pages = useSelector((state: RootState) => state.pageSlice.Pages);
  // useEffect(() => {
  //   dispatch(getPages());
  // });
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
