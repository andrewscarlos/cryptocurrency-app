import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  ThemeProvider,
  Container,
} from "@mui/material";

import { useAppTheme } from "@/shared/hooks/useAppTheme";
import { ResponsiveDrawer } from "./Drawer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}
const DRAWER_WIDTH = 240;

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
          }}
        >
          <Header
            handleDrawerToggle={handleDrawerToggle}
            toggle={toggleCurrentTheme}
            theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
          />
        </AppBar>
        <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle} />
        <Container maxWidth="lg" sx={{ color: "white", my: 12 }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
