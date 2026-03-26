import { createRoute } from '@tanstack/react-router';
import { useSignIn, useSignUp, useAuth, useClerk } from '@clerk/react';
import { useState, useEffect } from 'react';
import { Box, Card, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { CredentialsStep } from '@/components/auth/CredentialsStep';
import { VerifyStep } from '@/components/auth/VerifyStep';
import { toaster } from '@/components/ui/toaster';

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
});

type Step = 'credentials' | 'verify';

function SignInPage() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { setActive } = useClerk();
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('credentials');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: '/dashboard' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    const { error } = await signIn.password({ emailAddress: email, password });
    setIsLoading(false);
    if (error) {
      if ((error as any).errors?.[0]?.code === 'form_identifier_not_found') {
        setIsSigningUp(true);
        return;
      }
      const msg = (error as any).errors?.[0]?.longMessage ?? error.message;
      setError(msg);
      toaster.create({ description: msg, type: 'error' });
      return;
    }

    if (signIn.status === 'complete') {
      await setActive({ session: signIn.createdSessionId });
      navigate({ to: '/dashboard' });
    } else if (signIn.status === 'needs_second_factor' || signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === 'email_code',
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
      setStep('verify');
    }
  };

  const handleCreateAccount = async () => {
    setError('');
    setIsLoading(true);
    const { error: pwError } = await signUp.password({ emailAddress: email, password, firstName });
    if (pwError) {
      setIsLoading(false);
      const msg = (pwError as any).errors?.[0]?.longMessage ?? pwError.message;
      setError(msg);
      toaster.create({ description: msg, type: 'error' });
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    setIsLoading(false);
    if (sendError) {
      const msg = (sendError as any).errors?.[0]?.longMessage ?? sendError.message;
      setError(msg);
      toaster.create({ description: msg, type: 'error' });
      return;
    }
    setStep('verify');
  };

  const handleVerify = async () => {
    setError('');
    setIsLoading(true);
    if (isSigningUp) {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      setIsLoading(false);
      if (error) {
        const msg = (error as any).errors?.[0]?.longMessage ?? error.message;
        setError(msg);
        toaster.create({ description: msg, type: 'error' });
        return;
      }
      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId });
        navigate({ to: '/dashboard' });
      }
      return;
    }

    const { error } = await signIn.mfa.verifyEmailCode({ code });
    setIsLoading(false);
    if (error) {
      const msg = (error as any).errors?.[0]?.longMessage ?? error.message;
      setError(msg);
      toaster.create({ description: msg, type: 'error' });
      return;
    }
    if (signIn.status === 'complete') {
      await setActive({ session: signIn.createdSessionId });
      navigate({ to: '/dashboard' });
    }
  };

  const handleResend = async () => {
    try {
      if (isSigningUp) {
        await signUp.verifications.sendEmailCode();
      } else {
        await signIn.mfa.sendEmailCode();
      }
      toaster.create({ description: 'Code resent', type: 'success' });
    } catch {
      toaster.create({ description: 'Failed to resend code', type: 'error' });
    }
  };

  if (!isLoaded || isSignedIn) return null;

  const headerContent = {
    credentials: { title: 'Welcome!', description: 'Sign in or create an account.' },
    verify: {
      title: isSigningUp ? 'Almost there!' : 'Verify your account',
      description: `We sent a code to ${email}`,
    },
  }[step];

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Card.Root size="lg" w="100%" maxW={480} p={2}>
        <Card.Header pb={2}>
          <Card.Title fontSize="lg">{headerContent.title}</Card.Title>
          <Card.Description>{headerContent.description}</Card.Description>
        </Card.Header>

        <Card.Body gap={4}>
          {step === 'credentials' && (
            <CredentialsStep
              email={email}
              password={password}
              firstName={firstName}
              showNameField={isSigningUp}
              errors={{}}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onFirstNameChange={setFirstName}
              onSubmit={handleSubmit}
              onCreateAccount={handleCreateAccount}
            />
          )}
          {step === 'verify' && (
            <VerifyStep
              isLoading={isLoading}
              onCodeComplete={setCode}
              onVerify={handleVerify}
              onResend={handleResend}
              codeLength={code.length}
            />
          )}

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
        </Card.Body>
      </Card.Root>

      {/* Required for sign-up flows — Clerk bot protection */}
      <div id="clerk-captcha" />
    </Box>
  );
}
