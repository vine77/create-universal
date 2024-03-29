import { Box, Heading, Link, LinkText, Text } from '@gluestack-ui/themed'

import ReactLogo from '../assets/images/react-logo.svg'

export default function Page() {
  return (
    <Box alignItems="center" flex={1} justifyContent="center" marginBottom={80}>
      <Box>
        <ReactLogo width={200} height={200} />
      </Box>
      <Heading marginBottom={20}>
        <Text>
          Edit <Text fontFamily="monospace">app/index.tsx</Text> and save to
          reload.
        </Text>
      </Heading>
      <Box>
        <Text>
          <Link href="https://react.dev/" isExternal>
            <LinkText>React docs</LinkText>
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href="https://reactnative.dev/" isExternal>
            <LinkText>React Native docs</LinkText>
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href="https://docs.expo.dev/" isExternal>
            <LinkText>Expo docs</LinkText>
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href="https://docs.expo.dev/router/introduction/" isExternal>
            <LinkText>Expo Router docs</LinkText>
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>
          <Link href="https://gluestack.io/ui/" isExternal>
            <LinkText>Gluestack docs</LinkText>
          </Link>
        </Text>
      </Box>
    </Box>
  )
}
