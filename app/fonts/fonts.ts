import { Anuphan, Montserrat, Akshar } from "next/font/google";

export const montserrat = Montserrat({
    weight: ['500', '700'],
    subsets: ['latin'],
    variable: "--font-montserrat",
});
  
export const akshar = Akshar({
    weight: ['500', '700'],
    subsets: ['latin'],
    variable: "--font-akshar",
});
  
export const anuphan = Anuphan({
    weight: ['500', '700'],
    subsets: ['thai'],
    variable: "--font-anuphan",
})