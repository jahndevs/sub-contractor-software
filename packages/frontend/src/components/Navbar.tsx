import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { ColorModeButton } from '@/components/ui/color-mode';
import { UserMenu } from './UserMenu';

export function Navbar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="bg.subtle"
      borderBottomWidth="1px"
      px={6}
      py={3}
    >
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <HStack gap={20}>
          <Text fontWeight="bold" fontSize="lg">
            Software (Demo)
          </Text>
          <SearchBar />
        </HStack>
        <HStack gap={4}>
          <ColorModeButton />
          <Text>{import.meta.env.VITE_USER_NAME}</Text>
          <UserMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
