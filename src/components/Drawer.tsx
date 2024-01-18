import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface ResponsiveDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 240;

const ROUTES = [
  {
    path: "/",
    name: "Dashboard",
  },
  {
    path: "/cryptocurrency",
    name: "Cryptocurrency",
  },
  {
    path: "/wallet",
    name: "Wallet",
  },
];
export function ResponsiveDrawer({ onClose, open }: ResponsiveDrawerProps) {
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Klever Challange
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {ROUTES.map((route) => (
          <Link
            key={route.path}
            onClick={onClose}
            href={route.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>{route.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            backgroundColor: "background.default",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
