'use client';

import { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Stack,
} from '@mui/material';

type Props = {
  onSearch: (params: {
    searchTerm: string;
    location: string;
    property: string;
    sort: 'asc' | 'desc' | '';
  }) => void;
};

export default function SearchFilterBar({ onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [property, setProperty] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc' | ''>('');

  const handleSearch = () => {
    onSearch({ searchTerm, location, property, sort });
  };

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Cari nama properti"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Lokasi</InputLabel>
        <Select
          value={location}
          label="Lokasi"
          onChange={(e) => setLocation(e.target.value)}
        >
          <MenuItem value="">Semua</MenuItem>
          <MenuItem value="Semarang">Semarang</MenuItem>
          <MenuItem value="Tembalang">Tembalang</MenuItem>
          <MenuItem value="Banyumanik">Banyumanik</MenuItem>
          <MenuItem value="Pecinan">Pecinan</MenuItem>
          <MenuItem value="Genuk">Genuk</MenuItem>
          <MenuItem value="Marina">Marina</MenuItem>
          <MenuItem value="Pandanaran">Pandanaran</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Property</InputLabel>
        <Select
          value={property}
          label="Property"
          onChange={(e) => setProperty(e.target.value)}
        >
          <MenuItem value="">Semua</MenuItem>
          <MenuItem value="rumah">Rumah</MenuItem>
          <MenuItem value="apartemen">Apartemen</MenuItem>
          <MenuItem value="ruko">Ruko</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Urutkan</InputLabel>
        <Select
          value={sort}
          label="Urutkan"
          onChange={(e) => setSort(e.target.value as 'asc' | 'desc' | '')}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="asc">Harga Termurah</MenuItem>
          <MenuItem value="desc">Harga Termahal</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSearch}>
        Cari
      </Button>
    </Stack>
  );
}
