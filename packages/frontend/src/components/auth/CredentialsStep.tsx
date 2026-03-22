import { Button, Input, Field } from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';

interface Props {
  email: string;
  password: string;
  errors: { identifier?: { message: string } | null; password?: { message: string } | null };
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
}

export function CredentialsStep({
  email,
  password,
  errors,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
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
        />
        {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
      </Field.Root>
      <Button
        w="full"
        colorPalette="brand"
        size="lg"
        onClick={onSubmit}
        disabled={!email || !password || isLoading}
        loading={isLoading}
      >
        Continue
      </Button>
    </>
  );
}
