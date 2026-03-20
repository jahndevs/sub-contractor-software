import { createRoute, Link } from '@tanstack/react-router';
import { useSignUp } from '@clerk/react';
import { useState } from 'react';
import { Box, Input, Card, Button, Field, PinInput } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp, fetchStatus } = useSignUp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const isLoading = fetchStatus === 'fetching';

  const handleSubmit = async () => {
    if (password !== confirmPassword) return;
    const { error } = await signUp.password({ emailAddress: email, password });
    if (!error) {
      await signUp.verifications.sendEmailCode();
      setVerifying(true);
    }
  };

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (!error && signUp.status === 'complete') {
      await signUp.finalize();
      navigate({ to: '/dashboard' });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card.Root size="lg" w="100%" maxW={480} p={2}>
        <Card.Header pb={2}>
          {!verifying ? (
            <>
              <Card.Title fontSize="lg">Welcome!</Card.Title>
              <Card.Description>Let's get you set up.</Card.Description>
            </>
          ) : (
            <>
              <Card.Title fontSize="lg">Almost there!</Card.Title>
              <Card.Description>Check the code sent to {email}</Card.Description>
            </>
          )}
        </Card.Header>
        <Card.Body gap={4}>
          {!verifying ? (
            <>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  placeholder="example@example.com"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  placeholder="password"
                  size="lg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field.Root>
              <Field.Root invalid={confirmPassword.length > 0 && password !== confirmPassword}>
                <Field.Label>Confirm Password</Field.Label>
                <Input
                  placeholder="confirm password"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length > 0 && password !== confirmPassword ? (
                  <Field.ErrorText>Passwords do not match</Field.ErrorText>
                ) : (
                  <Field.HelperText>
                    Already have an account?{' '}
                    <Link to="/sign-in" style={{ textDecoration: 'underline' }}>
                      Sign in
                    </Link>
                  </Field.HelperText>
                )}
              </Field.Root>
            </>
          ) : (
            <Field.Root>
              <Field.Label>Verification code</Field.Label>
              <PinInput.Root onValueComplete={(e) => setCode(e.valueAsString)}>
                <PinInput.HiddenInput />
                <PinInput.Control>
                  <PinInput.Input index={0} />
                  <PinInput.Input index={1} />
                  <PinInput.Input index={2} />
                  <PinInput.Input index={3} />
                  <PinInput.Input index={4} />
                  <PinInput.Input index={5} />
                </PinInput.Control>
              </PinInput.Root>
            </Field.Root>
          )}
        </Card.Body>
        <Card.Footer pt={2}>
          <Button
            w="full"
            colorPalette="brand"
            size="lg"
            onClick={verifying ? handleVerify : handleSubmit}
            disabled={isLoading || (!verifying && password !== confirmPassword)}
            loading={isLoading}
          >
            {verifying ? 'Verify' : 'Create account'}
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}
