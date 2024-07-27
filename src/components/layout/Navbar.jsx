import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import theme from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };

  const notifications = ["Your recent activities here"];

  const currentDateTime = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: isSidebarOpen ? "calc(100vw - 280px)" : "100vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!isSidebarOpen && (
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            p="0.1rem 1.5rem"
          >
            <Typography color={theme.palette.text.primary}>
              Welcome, Admin
            </Typography>
            <Typography
              color={theme.palette.text.secondary}
              fontSize={"0.8rem"}
            >
              {currentDateTime}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* <button
            className="scale-100 hover:scale-110 transition-all duration-200"
            onClick={handleNotificationsOpen}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[#E8E9ED] rounded-full transition-all">
              <NotificationsOutlined
                sx={{ fontSize: "24px", color: "#34495E" }}
              />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-600"></span>
            </div>
          </button> */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationsClose}
            sx={{ mt: "4px" }}
          >
            <List>
              {notifications.map((notification, index) => (
                <ListItem className="cursor-default" key={index}>
                  <ListItemText primary={notification} />
                </ListItem>
              ))}
            </List>
          </Menu>
          <button
            className="scale-100 hover:scale-110 transition-all duration-200"
            onClick={handleMenuOpen}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[#E8E9ED] rounded-full transition-all">
              <FontAwesomeIcon
                icon={faUser}
                color="#34495E"
                className="text-xl"
              />
            </div>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: "4px" }}
          >
            <MenuItem onClick={() => navigate("/auth")}>
              <LogoutOutlined sx={{ marginRight: "8px", color: "#334E6C" }} />
              <span className="text-heading">Logout</span>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
