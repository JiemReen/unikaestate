'use client'

import Link from 'next/link'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip
} from '@mui/material'
import { FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa'

import type { Property } from '@/types/Property';

type Props = {
  data: Property
}

export default function PropertyCard({ data }: Props) {
  return (
    <Link href={`/properti/${data.id}`} passHref>
      <Card
        sx={{
          maxWidth: 350,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: '0.3s',
          cursor: 'pointer',
          '&:hover': { transform: 'scale(1.02)' }
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={data.image}
          alt={data.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom noWrap>
            {data.title}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} color="gray" fontSize={14} mb={1}>
            <FaMapMarkerAlt />
            <Typography variant="body2" color="text.secondary">
              {data.location}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={1}>
            Harga Rp {data.price.toLocaleString('id-ID')}
          </Typography>

          <Box display="flex" gap={1} mb={1}>
            <Chip label={data.property} size="small" color="success" />
            <Chip label={data.type === 'sale' ? 'Jual' : 'Sewa'} size="small" color="error" />
          </Box>

          <Box display="flex" alignItems="center" gap={1} fontSize={14}>
            <FaRulerCombined />
            <Typography variant="body2">{data.area} m²</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}
