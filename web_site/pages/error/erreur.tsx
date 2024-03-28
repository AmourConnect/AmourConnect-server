'use client' // Error components must be Client Components
 
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'
import { ThemeProvider } from "next-themes";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <Alert>
        <AlertTriangle />
        <AlertTitle>Oups quelque chose c'est mal passée :/</AlertTitle>
        <AlertDescription>
            Problème avec le client réessayer plus tard
        </AlertDescription>
    </Alert>
    </ThemeProvider>
  )
}