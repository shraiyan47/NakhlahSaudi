import { Inter } from 'next/font/google'
import Font from 'next/font/local'
export const inter = Inter({
    subsets: ['latin'],
  })

export const gumelaArabic = Font({
    src: [
      {
        path: '../font/GumelaArabic-Bold.otf',
        weight: '700',
      },
      {
        path: '../font/GumelaArabic-Light.otf',
        weight: '300',
      },
      {
        path: '../font/GumelaArabic-Regular.otf',
        weight: '400',
      },
    ]
})