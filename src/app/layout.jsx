// "use client";
import MainLayout from '@/layout/MainLayout'
import { gumelaArabic } from '../../public/assets/js/fonts'
import './globals.css'
import { Toaster } from '@/components/ui/toaster' 
import ResponsiveVoice from './responsiveVoice';


export const metadata = {
  title: 'Nakhlah',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) { 

  return (
    <html lang="en">
      <body className={gumelaArabic.className}>
      <ResponsiveVoice /> 
        <MainLayout child={children}/>
        <Toaster /> 
      </body>
    </html>
  )
}
