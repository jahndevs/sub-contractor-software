import { defineStyle, Flex, Status, Text } from '@chakra-ui/react';
import { useState } from 'react';

type SyncState = 'synced' | 'syncing' | 'error';

const pulseStyle = defineStyle({
  animation: 'pulse',
  animationDuration: '1s',
  animationIterationCount: 'infinite',
});

const colorMap: Record<SyncState, string> = {
  synced: 'green',
  syncing: 'orange',
  error: 'red',
};

const labelMap: Record<SyncState, string> = {
  synced: 'Synced 4 mins ago',
  syncing: 'Syncing...',
  error: 'Sync failed',
};

export function SyncStatus() {
  // Toggle state here when wired to a real API
  const [syncState] = useState<SyncState>('syncing');

  return (
    <Flex
      align="center"
      gap={2}
      px={3}
      py={1.5}
      borderRadius="full"
      borderWidth="1px"
      borderColor="gray.200"
      bg="gray.50"
    >
      <Status.Root colorPalette={colorMap[syncState]} size="sm">
        <Status.Indicator css={syncState === 'syncing' ? pulseStyle : undefined} />
      </Status.Root>
      <Text fontSize="xs" color="gray.500">
        {labelMap[syncState]} · Knowify + QuickBooks
      </Text>
    </Flex>
  );
}
