import PropertyCard from '@/components/PropertyCard'
import { Container, Typography, Grid } from '@mui/material'

async function fetchProperti() {
  const res = await fetch('https://687134f07ca4d06b34b9b681.mockapi.io/properties', {
    cache: 'no-store', // optional: selalu ambil data terbaru
  })

  if (!res.ok) throw new Error('Gagal memuat data properti')

  return res.json()
}

export default async function PropertiPage() {
  const data = await fetchProperti()

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Daftar Properti
      </Typography>

      <Grid container spacing={3}>
        {data.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <PropertyCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
