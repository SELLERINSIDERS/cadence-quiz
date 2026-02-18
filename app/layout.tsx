import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Find Your Sleep Solution | CADENCE Calm+Rest Quiz',
  description:
    'Take our 3-minute science-backed assessment to discover your personalized stress relief and sleep support plan. Get $10 off your first order.',
  openGraph: {
    title: 'Find Your Sleep Solution | CADENCE Calm+Rest Quiz',
    description:
      'Discover which clinical-grade ingredients work best for your unique stress triggers and sleep patterns. Free 3-minute assessment.',
    siteName: 'Evolance',
    type: 'website',
  },
  robots: 'noindex, nofollow', // Quiz page — exclude from search during launch
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
