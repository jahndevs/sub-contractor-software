import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { ColorModeButton } from '@/components/ui/color-mode';
import { UserMenu } from './UserMenu';
import { SyncStatus } from './SyncStatus';

export function Navbar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="bg.nav"
      color="text.nav"
      borderBottomWidth="1px"
      px={6}
      py={3}
    >
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <HStack gap={20}>
          <Text fontWeight="bold" fontSize="lg">
            Contract Pro (Version 0.0.1)
          </Text>
          <HStack gap={1}>
            <SearchBar />
          </HStack>
        </HStack>
        <HStack gap={4}>
          <SyncStatus />
          <ColorModeButton />
          <Text>{import.meta.env.VITE_USER_NAME}</Text>
          <UserMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
