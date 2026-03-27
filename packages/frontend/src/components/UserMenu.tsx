import { Avatar, Box, Menu, Portal } from '@chakra-ui/react';
import { useClerk } from '@clerk/react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { UserProfile } from './UserProfile';

export function UserMenu() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = async () => {
    navigate({ to: '/sign-in' });
    await signOut();
  };

  const handleEditProfile = () => {
    setShowProfile(true);
  };

  return (
    <>
      <Menu.Root positioning={{ placement: 'bottom-end' }}>
        <Menu.Trigger asChild>
          <Box
            as="button"
            bg="transparent"
            border="none"
            cursor="pointer"
            borderRadius="full"
            p={0}
            outline="none"
          >
            <Avatar.Root>
              <Avatar.Fallback name={import.meta.env.VITE_USER_NAME} />
              <Avatar.Image src="https://avatars.githubusercontent.com/u/245767743?v=4" />
            </Avatar.Root>
          </Box>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="edit-profile" onClick={handleEditProfile}>
                Edit Account
              </Menu.Item>
              <Menu.Item value="settings">Settings</Menu.Item>
              <Menu.Item
                value="sign-out"
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                onClick={handleSignOut}
              >
                Sign Out
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </>
  );
}
