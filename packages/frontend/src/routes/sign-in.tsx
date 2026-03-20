import { createRoute, Link } from '@tanstack/react-router';
import { useSignIn, useAuth } from '@clerk/react';
import { useState, useEffect } from 'react';
import { Box, Button, Input, Stack, Text, Field, Card } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
});

function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: '/dashboard' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  const isLoading = fetchStatus === 'fetching';

  const handleSubmit = async () => {
    await signIn.password({ identifier: email, password });
    if (signIn.status === 'complete') {
      await signIn.finalize();
      navigate({ to: '/dashboard' });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card.Root size="lg" w="100%" maxW={480} p={2}>
        <Card.Header pb={2}>
          <Card.Title fontSize="lg">Welcome back!</Card.Title>
        </Card.Header>
        <Card.Body gap={4}>
          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              size="lg"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              size="lg"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Field.HelperText>
              Don't have an account?{' '}
              <Link to="/sign-up" style={{ textDecoration: 'underline' }}>
                Sign up
              </Link>
            </Field.HelperText>
          </Field.Root>
        </Card.Body>
        <Card.Footer pt={2}>
          <Button
            w="full"
            colorPalette="brand"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
          >
            Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
