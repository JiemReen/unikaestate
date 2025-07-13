'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, Container } from '@mui/material';

const LogoutPage = () => {
    const router = useRouter();

    useEffect(() => {
        console.log('Logging out...');
        setTimeout(() => {
        router.push('/');
        }, 1000);
    }, [router]);

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 8 }}>
        <Typography variant="h5" color="primary">
            Logging out...
        </Typography>
        </Container>
    );
};

export default LogoutPage;
