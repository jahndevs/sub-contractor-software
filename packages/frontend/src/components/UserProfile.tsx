import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Separator,
  Text,
  VStack,
  Input,
  Field,
} from '@chakra-ui/react';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  return (
    <Dialog.Root
      open
      onOpenChange={({ open }) => {
        if (!open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <CloseButton size="sm" position="absolute" top={3} right={3} onClick={onClose} />
            <VStack align="stretch" gap={0} py={5}>
              {/* Header */}
              <VStack gap={1} align="start" px={6} pb={4}>
                <Dialog.Title>Account</Dialog.Title>
                <Dialog.Description>Manage your account details.</Dialog.Description>
              </VStack>

              <Separator mx={6} />

              {/* Avatar */}
              <HStack w="full" justify="space-between" px={6} py={4}>
                <Avatar.Root size="2xl">
                  <Avatar.Fallback name={import.meta.env.VITE_USER_NAME} />
                  <Avatar.Image src="https://avatars.githubusercontent.com/u/245767743?v=4" />
                </Avatar.Root>
                <Box display="flex" flexDirection="row" gap={2}>
                  <Button variant="outline" size="sm">
                    Upload Picture
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </Box>
              </HStack>

              <Separator mx={6} />

              {/* Name Info */}
              <VStack align="start" gap={3} px={6} py={4}>
                <Text fontWeight="semibold" fontSize="lg">
                  Name
                </Text>
                <HStack gap={4}>
                  <Input defaultValue="" placeholder="John" />
                  <Input defaultValue="" placeholder="Doe" />
                </HStack>
              </VStack>

              <Separator mx={6} />

              {/* Email Info */}
              <VStack align="start" gap={3} px={6} py={4}>
                <Field.Root required>
                  <Field.Label>
                    Email
                  </Field.Label>
                  <Input placeholder="Enter your email" />
                </Field.Root>
              </VStack>

              <Separator mx={6} />

              {/* Password Info */}
              <HStack align="start" gap={3} px={6} py={4}>
                <Field.Root required>
                  <Field.Label>
                    Current Password
                  </Field.Label>
                  <Input placeholder="Enter your current password" type="password" />
                </Field.Root>
                <Field.Root required>
                  <Field.Label>
                    New Password
                  </Field.Label>
                  <Input placeholder="Enter your new password" type="password" />
                </Field.Root>
              </HStack>

              {/* Footer */}
              <HStack justify="flex-end" px={6} pt={4}>
                <Button variant="outline" onClick={onClose}>
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
