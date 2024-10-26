import './globals.css'

export const metadata = {
  title: 'Book Store',
  description: 'A simple book store application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}