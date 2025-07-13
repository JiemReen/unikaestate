import PropertyCard from '@/components/PropertyCard';
import { Container, Typography, Grid } from '@mui/material';

type Property = {
  id: string;
  title: string;
  image: string;
  location: string;
  type: string;
  area: number;
  price: number;
  description: string;
};

async function fetchProperti(): Promise<Property[]> {
  const res = await fetch('https://687134f07ca4d06b34b9b681.mockapi.io/properties', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Gagal memuat data properti');

  return res.json();
}

export default async function PropertiPage() {
  const data = await fetchProperti();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Daftar Properti
      </Typography>

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <PropertyCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
