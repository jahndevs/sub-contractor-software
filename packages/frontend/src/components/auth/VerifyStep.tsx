import { Button, Field } from '@chakra-ui/react';
import { PinInput } from '@chakra-ui/react';

interface Props {
  isLoading: boolean;
  onCodeComplete: (code: string) => void;
  onVerify: () => void;
  onResend: () => void;
  codeLength: number;
}

export function VerifyStep({ isLoading, onCodeComplete, onVerify, onResend, codeLength }: Props) {
  return (
    <>
      <Field.Root>
        <Field.Label>Verification code</Field.Label>
        <PinInput.Root
          onValueComplete={(e) => onCodeComplete(e.valueAsString)}
          disabled={isLoading}
        >
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
      <Button
        w="full"
        colorPalette="brand"
        size="lg"
        onClick={onVerify}
        disabled={codeLength < 6 || isLoading}
        loading={isLoading}
      >
        Verify
      </Button>
      <Button
        w="full"
        variant="ghost"
        size="sm"
        onClick={onResend}
        disabled={isLoading}
        loading={isLoading}
      >
        Resend code
      </Button>
    </>
  );
}
