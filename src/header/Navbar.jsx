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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useScroll from "../hooks/useScrollListener/UseScroll";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import InputSearch from "../components/InputSearch";
const drawerWidth = 240;
const navItems = ["Home", "Movie", "Tv"];

function DrawerAppBar(props) {
  const scroll = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navClass, setNavClass] = useState("");
  useEffect(() => {
    if (scroll.y > scroll.lastY) {
      setNavClass("hidden");
    } else setNavClass("");
  }, [scroll]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky",
        width: "100%",
        height: "70px",
        zIndex: 10,
        transition: " transform 250ms ease-in-out",
        "& .MuiPaper-root ": {
          width: "inherit",
          height: "inherit",
          boxShadow: "none",
        },
      }}
      className={navClass}
    >
      <AppBar
        sx={{
          height: "inherit",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(6, 6, 6, 0.379)",
        }}
      >
        <Toolbar
          sx={{
            height: "inherit",
            width: "60%",
          }}
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MovieFlex
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          {/* <TextField
            label="Search"
            variant="filled"
            sx={{
              "& label": {
                color: "whitesmoke",
                fontWeight: 700,
                letterSpacing: "2px",
              },
            }}
          /> */}
          <InputSearch width="25ch" />
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
