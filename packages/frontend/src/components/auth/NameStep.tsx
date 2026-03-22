import { Button, Input, Field } from '@chakra-ui/react';

interface Props {
  firstName: string;
  isLoading: boolean;
  onFirstNameChange: (value: string) => void;
  onSubmit: () => void;
}

export function NameStep({ firstName, isLoading, onFirstNameChange, onSubmit }: Props) {
  return (
    <>
      <Field.Root>
        <Field.Label>First name</Field.Label>
        <Input
          placeholder="John"
          size="lg"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          autoFocus
        />
      </Field.Root>
      <Button
        w="full"
        colorPalette="brand"
        size="lg"
        onClick={onSubmit}
        disabled={!firstName || isLoading}
        loading={isLoading}
      >
        Create account
      </Button>
    </>
  );
}
