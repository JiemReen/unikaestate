'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import type { Property } from '@/types/Property';

type Props = {
  pageTitle: string;
  propertyType: 'sale' | 'rent';
};

export default function PropertyListPage({ pageTitle, propertyType }: Props) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item: Property) => item.type?.toLowerCase() === propertyType
        );
        setProperties(filtered);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propertyType]);

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
        {pageTitle}
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {properties.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <PropertyCard data={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
