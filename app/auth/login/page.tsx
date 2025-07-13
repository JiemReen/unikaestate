'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      // Simpan role ke context
      login(data.role);

      // Redirect ke halaman utama
      router.push('/');
    } catch (err) {
      const error = err as Error;
      setErrorMsg(error.message || 'Terjadi kesalahan');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} bgcolor="#f0f0f0" borderRadius={2}>
        <Typography variant="h5" mb={2}>Login</Typography>

        {errorMsg && (
          <Typography color="error" mb={2}>
            {errorMsg}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Box mt={2}>
          <Typography variant="body2">
            Belum punya akun? <a href="/auth/signup">Daftar di sini</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
