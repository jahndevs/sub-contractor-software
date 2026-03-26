import { Button, Input, Field } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';

interface Props {
  email: string;
  password: string;
  firstName: string;
  showNameField: boolean;
  errors: { identifier?: { message: string } | null; password?: { message: string } | null };
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onFirstNameChange: (value: string) => void;
  onSubmit: () => void;
  onCreateAccount: () => void;
}

export function CredentialsStep({
  email,
  password,
  firstName,
  showNameField,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onFirstNameChange,
  onSubmit,
  onCreateAccount,
}: Props) {
  return (
    <>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          type="email"
          size="lg"
          placeholder="example@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={isLoading}
        />
        {errors.identifier && <Field.ErrorText>{errors.identifier.message}</Field.ErrorText>}
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <PasswordInput
          size="lg"
          placeholder="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={isLoading}
        />
        {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
      </Field.Root>
      {showNameField && (
        <Field.Root>
          <Field.Label>First name</Field.Label>
          <Input
            placeholder="John"
            size="lg"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
        </Field.Root>
      )}
      <Button
        w="full"
        colorPalette="brand"
        size="lg"
        onClick={showNameField ? onCreateAccount : onSubmit}
        disabled={!email || !password || (showNameField && !firstName) || isLoading}
        loading={isLoading}
      >
        {showNameField ? 'Create account' : 'Continue'}
      </Button>
    </>
  );
}
