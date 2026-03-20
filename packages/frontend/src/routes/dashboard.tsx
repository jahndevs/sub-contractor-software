import { createRoute, useNavigate } from '@tanstack/react-router';
import { useUser, useClerk, useAuth } from '@clerk/react';
import { useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { rootRoute } from './__root';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) return null;

  const handleSignOut = async () => {
    navigate({ to: '/sign-in' });
    await signOut();
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl">Hi, {user?.emailAddresses[0]?.emailAddress}</Text>
      <Button mt={4} onClick={handleSignOut}>
        Sign out
      </Button>
    </Box>
  );
}
