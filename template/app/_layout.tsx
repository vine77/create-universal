import FontAwesome from '@expo/vector-icons/FontAwesome'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

import { config } from '../src/components/gluestack-ui.config'

// Catch errors thrown by the Layout component
export { ErrorBoundary } from 'expo-router'

// export const unstable_settings = {
//   // Ensure that reloading keeps back button present
//   initialRouteName: '/',
// }

// Prevent splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  )
}
