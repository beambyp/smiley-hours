import { Anuphan, Montserrat, Akshar } from "next/font/google";

export const montserrat = Montserrat({
    weight: ['500', '700'],
    subsets: ['latin'],
    variable: "--font-montserrat",
    // display: 'swap',
    // fallback: ['system-ui', 'sans-serif'],
});
  
export const akshar = Akshar({
    weight: ['500', '700'],
    subsets: ['latin'],
    variable: "--font-akshar",
    // display: 'swap',
    // fallback: ['system-ui', 'sans-serif'],
});

export const anuphan = Anuphan({
    weight: ['500', '700'],
    subsets: ['thai'],
    variable: "--font-anuphan",
    // display: 'swap',
    // fallback: ['system-ui', 'sans-serif']
});