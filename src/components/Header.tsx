import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  toggle: () => void;
  theme: string;
  handleDrawerToggle?: () => void;
}

export function Header({ toggle, theme, handleDrawerToggle }: HeaderProps) {
 
  return (
    <Box>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography></Typography>
        </Box>
        <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </Box>
  );
}
