import Image from 'next/image';

export default async function PropertiSatu() {
    const res = await fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties/6', {
        cache: 'no-store',
    });

    const data = await res.json();

    return (
        <div style={{ padding: '2rem' }}>
        <h1>{data.title}</h1>
        <Image src={data.image} alt={data.title} width={600} height={400} />
        <p>{data.location}</p>
        <p>{data.description}</p>
        <p>Harga: Rp {data.price.toLocaleString('id-ID')}</p>
        </div>
    );
}
