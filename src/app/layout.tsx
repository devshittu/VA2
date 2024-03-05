import '@/styles/global.css'
import React, { ReactNode } from 'react';
import { Inter } from 'next/font/google';

// Initialize the font
const inter = Inter({ subsets: ['latin'] });

// Define a type for the component props
type RootLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: 'Visual Analytics of Car Data',
  description: 'COMP5048',
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
    <div className={inter.className}>
      {children}
    </div>
      </body>
    </html>
  );
};

export default RootLayout;