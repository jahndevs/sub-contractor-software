import { Box, Flex, HStack, Button, Text } from '@chakra-ui/react';
import { useClerk } from '@clerk/react';
import { useNavigate } from '@tanstack/react-router';

export function Navbar() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate({ to: '/sign-in' });
    await signOut();
  };

  return (
    <Box as="nav" position="sticky" top={0} zIndex="sticky" bg="bg.subtle" borderBottomWidth="1px" px={6} py={3}>
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <Text fontWeight="bold" fontSize="lg">Software (Demo)</Text>
        <HStack gap={2}>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
