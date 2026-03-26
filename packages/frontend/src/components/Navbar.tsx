import { Box, Flex, HStack, Text, Avatar, Menu, Portal } from '@chakra-ui/react';
import { useClerk } from '@clerk/react';
import { useNavigate } from '@tanstack/react-router';
import { SearchBar } from './SearchBar';

export function Navbar() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate({ to: '/sign-in' });
    await signOut();
  };

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
        <Text fontWeight="bold" fontSize="lg">
          Software (Demo)
        </Text>
        <HStack gap={4}>
          <SearchBar />
          <Menu.Root positioning={{ placement: 'bottom-end' }}>
            <Menu.Trigger asChild>
              <Box
                as="button"
                bg="transparent"
                border="none"
                cursor="pointer"
                borderRadius="full"
                p={0}
                outline="none"
              >
                <Avatar.Root>
                  <Avatar.Fallback name={import.meta.env.VITE_USER_NAME} />
                  <Avatar.Image src="https://avatars.githubusercontent.com/u/245767743?v=4" />
                </Avatar.Root>
              </Box>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="edit-profile">Edit Profile</Menu.Item>
                  <Menu.Item value="settings">Settings</Menu.Item>
                  <Menu.Item
                    value="sign-out"
                    color="fg.error"
                    _hover={{ bg: 'bg.error', color: 'fg.error' }}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  );
}
