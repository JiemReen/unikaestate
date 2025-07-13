import React from 'react';

export default async function DetailProperti({ params }: { params: { id: string } }) {
  const res = await fetch(`https://687134f07ca4d06b34b9b681.mockapi.io/properties/${params.id}`, {
    cache: 'no-store',
  });

  console.log('Status:', res.status);
  if (!res.ok) {
    console.error('Gagal mengambil properti dengan ID:', params.id);
    throw new Error('Gagal mengambil detail properti');
  }

  const data = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{data.title}</h1>
      <img src={data.image} alt={data.title} style={{ width: '100%', maxWidth: 600 }} />
      <p><strong>Lokasi:</strong> {data.location}</p>
      <p><strong>Tipe:</strong> {data.type}</p>
      <p><strong>Luas:</strong> {data.area} m²</p>
      <p><strong>Harga:</strong> Rp {data.price.toLocaleString('id-ID')}</p>
      <p>{data.description}</p>
    </div>
  );
}
