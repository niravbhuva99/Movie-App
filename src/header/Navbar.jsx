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
import "./Navbar.css";
import { Link, NavLink, useParams } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import { useDispatch, useSelector } from "react-redux";
import { setSearchbar } from "../Store/HomeSlice";
const drawerWidth = 240;
const navItems = [
  { text: "Home", link: "/" },
  { text: "Movie", link: "/movie" },
  { text: "TV", link: "/tv" },
];

function DrawerAppBar() {
  const scroll = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navClass, setNavClass] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const { showSearchbar } = useSelector((state) => state.home);
  console.log(showSearch);
  useEffect(() => {
    if (scroll.y > scroll.lastY) {
      setNavClass("hidden");
    } else setNavClass("");
  }, [scroll]);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  useEffect(() => {
    setshowSearch(showSearchbar);
  }, [showSearchbar]);
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <NavLink to="/">
        <Typography variant="h6" sx={{ my: 2 }}>
          MovieFlex
        </Typography>
      </NavLink>
      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.text} />
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
        top: 0,
        width: "100%",
        height: "70px",
        zIndex: 10,
        transition: " transform 250ms ease-in-out",
        backgroundColor: "rgba(6, 6, 6, 0.379)",
        borderBottom: "3px solid green",
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(6, 6, 6, 0.379)",
        }}
      >
        <Toolbar
          sx={{
            height: "inherit",
            width: "90%",
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
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              "& a": {
                textDecoration: "none",
                color: "whitesmoke",
              },
            }}
          >
            <Link to="/">MovieFlex</Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, i) => (
              <NavLink to={item.link} key={i}>
                <Button sx={{ color: "#fff" }}>{item.text}</Button>
              </NavLink>
            ))}
          </Box>

          {showSearch && <InputSearch width="45ch" />}
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
