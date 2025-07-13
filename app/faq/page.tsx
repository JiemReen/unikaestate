'use client';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqList = [
  {
    question: 'Bagaimana cara membeli properti di website ini?',
    answer:
      'Pilih properti yang Anda minati, lalu hubungi kontak yang tersedia pada halaman properti tersebut.',
  },
  {
    question: 'Apakah harga bisa dinegosiasikan?',
    answer:
      'Tergantung dari pemilik properti. Anda bisa menghubungi mereka langsung untuk negosiasi.',
  },
  {
    question: 'Apakah tersedia layanan KPR?',
    answer:
      'Kami bekerja sama dengan beberapa bank untuk membantu proses pengajuan KPR.',
  },
  {
    question: 'Apakah data properti ini valid?',
    answer:
      'Kami berusaha menampilkan data terkini dan akurat dari pemilik properti atau agen terkait.',
  },
];

export default function FAQPage() {
  return (
    <Container maxWidth="md" sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Pertanyaan Umum (FAQ)
      </Typography>

      {faqList.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" fontWeight="bold">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
