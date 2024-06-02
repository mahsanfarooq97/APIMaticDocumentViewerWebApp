import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { exportDocumentation } from "../../utils";
import Toast from "../Snackbar";

const drawerWidth = 240;
interface Page {
  title: string;
  bodyText: string;
}

interface AppRoutesProps {
  pages: Page[];
}
export default function SideMenu({ pages }: AppRoutesProps) {
  const [message, setMessage] = React.useState<string | null>(null);
  const [open, setOpenToast] = React.useState<boolean>(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setOpenToast(false);
    setMessage(null);
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const downloadJSON = () => {
    exportDocumentation(pages, () => {
      setMessage("JSON downloaded successfuly");
      setOpenToast(true);
    });
  };
  const drawer = (
    <div>
      <Toolbar />
      <Grid sx={{ pb: 2, pt: 2 }} container justifyContent={"center"}>
        <Button onClick={downloadJSON} variant="contained">
          Export
        </Button>
      </Grid>
      <Divider />
      <List>
        {pages?.map((page) => {
          const path = `/${page?.title?.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <ListItem key={page?.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  Navigate(path);
                }}
                selected={path === location?.pathname}
              >
                <ListItemText primary={page?.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{ display: { lg: "none", xl: "none", md: "none", sm: "none" } }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* <Button variant="contained">Contained</Button> */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {open && (
        <Toast message={message} open={open} handleClose={handleClose} />
      )}
    </>
  );
}
