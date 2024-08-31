import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

import ReactLogo from '../assets/images/react-logo.svg'

export default function Page() {
  return (
    <Box className="flex-1 items-center justify-center mb-80">
      <Box><ReactLogo width={200} height={200} /></Box>
      <Heading className="mb-20">
        <Text>
          Edit <Text className="font-mono">app/index.tsx</Text> and save to
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
