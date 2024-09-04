import { Box } from '@/components/ui/box'
import { Center } from '@/components/ui/center'
import { Heading } from '@/components/ui/heading'
import { Link, LinkText } from '@/components/ui/link'
import { Text } from '@/components/ui/text'

import ReactLogo from '../assets/images/react-logo.svg'

export default function Page() {
  return (
    <Center className="flex-1 mb-24 p-16">
      <Box>
        <ReactLogo height={200} width={200} />
      </Box>
      <Heading className="mb-16">
        <Text>
          Edit <Text className="font-mono">app/index.tsx</Text> and save to
          reload.
        </Text>
      </Heading>
      <Text>
        <Link href="https://react.dev/" isExternal>
          <LinkText>React docs</LinkText>
        </Link>
      </Text>
      <Text>
        <Link href="https://reactnative.dev/" isExternal>
          <LinkText>React Native docs</LinkText>
        </Link>
      </Text>
      <Text>
        <Link href="https://docs.expo.dev/" isExternal>
          <LinkText>Expo docs</LinkText>
        </Link>
      </Text>
      <Text>
        <Link href="https://docs.expo.dev/router/introduction/" isExternal>
          <LinkText>Expo Router docs</LinkText>
        </Link>
      </Text>
      <Text>
        <Link href="https://gluestack.io/ui/" isExternal>
          <LinkText>Gluestack docs</LinkText>
        </Link>
      </Text>
    </Center>
  )
}
