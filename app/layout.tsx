import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Educa Compras - Aplicativo Educativo sobre Compras',
  description: 'Aplicativo educativo para crianças aprenderem sobre compras e economia',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

