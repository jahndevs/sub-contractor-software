import { createRoute } from '@tanstack/react-router';
import { useSignIn, useSignUp, useAuth, useClerk } from '@clerk/react';
import { useState, useEffect } from 'react';
import { Box, Card, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { CredentialsStep } from '@/components/auth/CredentialsStep';
import { NameStep } from '@/components/auth/NameStep';
import { VerifyStep } from '@/components/auth/VerifyStep';

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignInPage,
});

type Step = 'credentials' | 'name' | 'verify';

function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
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

  const isLoading = fetchStatus === 'fetching';

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: '/dashboard' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  const handleSubmit = async () => {
    setError('');
    const { error } = await signIn.password({ emailAddress: email, password });
    if (error) {
      if ((error as any).errors?.[0]?.code === 'form_identifier_not_found') {
        setIsSigningUp(true);
        setStep('name');
        return;
      }
      setError(error.message);
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize();
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
    const { error: pwError } = await signUp.password({ emailAddress: email, password, firstName });
    if (pwError) {
      setError(pwError.message);
      return;
    }
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setError(sendError.message);
      return;
    }
    setStep('verify');
  };

  const handleVerify = async () => {
    setError('');
    if (isSigningUp) {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) {
        setError(error.message);
        return;
      }
      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId });
        navigate({ to: '/dashboard' });
      }
      return;
    }

    const { error } = await signIn.mfa.verifyEmailCode({ code });
    if (error) {
      setError(error.message);
      return;
    }
    await signIn.finalize();
    navigate({ to: '/dashboard' });
  };

  const handleResend = () => {
    if (isSigningUp) {
      signUp.verifications.sendEmailCode();
    } else {
      signIn.mfa.sendEmailCode();
    }
  };

  if (!isLoaded || isSignedIn) return null;

  const headerContent = {
    credentials: { title: 'Welcome!', description: 'Sign in or create an account.' },
    name: { title: 'One more thing', description: 'What should we call you?' },
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
              errors={errors.fields}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
            />
          )}
          {step === 'name' && (
            <NameStep
              firstName={firstName}
              isLoading={isLoading}
              onFirstNameChange={setFirstName}
              onSubmit={handleCreateAccount}
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
      <div id="clerk-captcha" />
    </Box>
  );
}
