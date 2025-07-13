'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@/app/context/AuthContext';

type NavLink = { label: string; path: string };

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loggedIn, role, logout } = useAuth();

  const baseLinks: NavLink[] = [
    { label: 'Beranda', path: '/' },
    { label: 'Dijual', path: '/dijual' },
    { label: 'Disewa', path: '/disewa' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Kontak', path: '/contact' },
  ];

  if (loggedIn && role === 'admin') {
    baseLinks.push({ label: 'Admin', path: '/admin' });
  }

  const authLinks: NavLink[] = loggedIn
    ? [{ label: 'Logout', path: '/auth/logout' }]
    : [
        { label: 'Login', path: '/auth/login' },
        { label: 'Sign Up', path: '/auth/signup' },
      ];

  const navLinks = [...baseLinks, ...authLinks];
  const mainNavPaths = new Set([
    '/dijual',
    '/disewa',
    '/faq',
    '/contact',
    '/admin',
  ]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleClick = async (
    e: React.MouseEvent<any, MouseEvent>,
    label: string,
    path: string
  ) => {
    if (label === 'Logout') {
      e.preventDefault();
      await fetch('/api/auth/logout', { method: 'POST' });
      logout(); // Hapus dari AuthContext
      router.push('/');
    } else {
      router.push(path);
    }
  };


  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map((link) => (
          <Link key={link.path} href={link.path} passHref>
            <ListItem disablePadding>
              <ListItemButton
                selected={pathname === link.path}
                onClick={(e) => handleClick(e, link.label, link.path)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          RealEstateApp
        </Typography>

        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
{navLinks.map((link) => {
  return (
    <Link key={link.path} href={link.path} passHref>
      <Button
        onClick={(e) => handleClick(e, link.label, link.path)}
        variant="text"
        sx={{
          color: 'white', // Default color
          bgcolor: pathname === link.path ? 'primary.dark' : 'transparent', // Active background
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: pathname === link.path ? 'primary.dark' : 'rgba(255,255,255,0.1)',
          },
        }}
      >
        {link.label}
      </Button>
    </Link>
  );
})}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}