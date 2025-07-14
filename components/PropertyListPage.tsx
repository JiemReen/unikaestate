'use client';

import { useEffect, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
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
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {properties.map((item) => (
            <Box key={item.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
              <PropertyCard data={item} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
