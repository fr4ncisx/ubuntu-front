import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/images/ubuntu-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth, Role } from "./../../context/AuthContext";

interface NavLink {
  text: string;
  path?: string;
  isTitle?: boolean;
}

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    user?.imagen
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const updatedUser = JSON.parse(storedUser);
        setProfileImage(updatedUser.imagen);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickClose);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickClose);
    };
  }, [menuOpen]);

  const handleClickClose = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
    setMenuIcon(!menuIcon);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setMenuIcon(true);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    handleClose();
  };

  const getInitials = (name: string, surname: string) => {
    return `${name[0]}${surname[0]}`;
  };

  const userLinks: NavLink[] = [
    { text: "Inicio", path: "/" },
    { text: "Microemprendimientos", path: "/microentrepreneaurship" },
    { text: "Publicaciones", path: "/publications" },
  ];

  const adminLinks: NavLink[] = [
    { text: "Administrador", isTitle: true },
    { text: "Dashboard Administrador", path: "/admin/dashboard" },
    { text: "Microemprendimientos", path: "/admin/micro" },
    { text: "Solicitudes de Contacto", path: "/admin/dashboard/contact" },
    { text: "Publicaciones", path: "/admin/publications" },
  ];

  useEffect(() => {
    if (user) {
      setProfileImage(user.imagen);
    }
  }, [user]);

  return (
    <div
      style={{
        height: 64,
      }}
    >
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        style={{ zIndex: 10 }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
            height: 64,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ color: "var(--negro)" }}
          >
            {menuIcon ? <MenuIcon /> : <CloseIcon />}
          </IconButton>

          <div style={{ flexGrow: 1, textAlign: "center" }}>
            <img src={Logo} alt="Logo" style={{ width: "120px" }} />
          </div>
          <div ref={menuRef}>
            {user && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  onClick={handleClick}
                  src={user?.imagen}
                  alt="Profile"
                  style={{
                    cursor: "pointer",
                    backgroundColor: profileImage
                      ? "transparent"
                      : "var(--negro)",
                    border: "1px solid #59BA47",
                    marginRight: "-3px",
                  }}
                >
                  {!profileImage &&
                    getInitials(user?.nombre || "", user?.apellido || "")}
                </Avatar>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      backgroundColor: "var(--grisClaro)",
                      borderRadius: "4px",
                      boxShadow: "none",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      const userRole = user?.rol;
                      if (userRole === Role.ADMIN) {
                        navigate("/admin-profile");
                      } else if (userRole === "USER") {
                        navigate("/user-profile");
                      }
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "var(--grisOscuro)",
                      },
                    }}
                  >
                    Ir a mi Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      "&:hover": {
                        backgroundColor: "var(--grisOscuro)",
                      },
                    }}
                  >
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Typography sx={{ fontWeight: 700 }}>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          PaperProps={{
            style: {
              width: 250,
              marginTop: 64,
              backgroundColor: "#093c59",
            },
          }}
        >
          <List
            style={{
              height: "100%",
              fontWeight: "700",
            }}
          >
            {(user?.rol === Role.ADMIN ? adminLinks : userLinks).map((item) => (
              <ListItem
                key={item.text}
                onClick={() => {
                  if (!item.isTitle) {
                    handleNavigation(item.path || "");
                  }
                }}
                sx={{ cursor: item.isTitle ? "default" : "pointer" }}
              >
                <ListItemText
                  primary={
                    <Typography
                      style={{
                        color: item.isTitle ? "var(--blanco)" : "var(--blanco)",
                        fontWeight: item.isTitle ? 700 : 700,
                        fontSize: item.isTitle ? 22 : 18,
                        marginTop: item.isTitle ? 0 : 0,
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            {!user && (
              <ListItem
                onClick={() => handleNavigation("/login")}
                sx={{
                  cursor: "pointer",
                  padding: "16px",
                  textAlign: "center",
                  alignSelf: "baseline",
                }}
              >
                <Typography
                  style={{
                    color: "var(--blanco)",
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  Iniciar sesión
                </Typography>
              </ListItem>
            )}
          </List>
        </Drawer>
      </Typography>
    </div>
  );
};

export default Navbar;
