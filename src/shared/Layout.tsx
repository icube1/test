import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
  const pages = [
    {name: 'home', path: '/'},
    {name: 'organisations', path: '/orgs'}, 
    {name: 'about', path: '/about'}, 
  ]
  const location = useLocation();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyLogo
          </Typography>
          {/* @ts-ignore */}
          <div sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                color="inherit"
                component={Link}
                to={page.path}
                sx={{
                  fontWeight: location.pathname === `/${page.path}` ? 'bold' : 'normal',
                  backgroundColor: location.pathname === `/${page.path}` ? 'rgba(255, 255, 255, 0.9)' : 'transparent'
                }}
              >
                {page.name}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Layout;