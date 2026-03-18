import { createRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import { trpc } from '../trpc/client';
import { rootRoute } from './__root';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

function HomePage() {
  const [name, setName] = useState('');
  const query = trpc.greeting.useQuery({ name });

  return (
    <Box p={6}>
      <Stack gap={4} maxW="md" mx="auto">
        <Text fontSize="2xl" fontWeight="bold">
          Sub-Contractor Software
        </Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Button onClick={() => query.refetch()}>Say hello</Button>
        {query.data ? <Text>{query.data.message}</Text> : null}
      </Stack>
    </Box>
  );
}
