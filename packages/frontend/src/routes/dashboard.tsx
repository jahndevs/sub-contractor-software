import { createRoute, useNavigate } from '@tanstack/react-router';
import { useUser, useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { rootRoute } from './__root';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" h="100vh" overflow="hidden">
      <Navbar />
      <Box display="flex" flex="1" minHeight={0}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <Box flex="1" overflowY="auto" px={8} py={6}>
          <Box maxW="1200px" mx="auto" display="flex" flexDirection="column" gap={6}>
            {/* KPI Cards */}
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {/* KPI Card */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.500">
                  Stat One
                </Text>
                <Text fontSize="2xl" fontWeight="bold" mt={1}>
                  —
                </Text>
              </Box>

              {/* KPI Card */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.500">
                  Stat Two
                </Text>
                <Text fontSize="2xl" fontWeight="bold" mt={1}>
                  —
                </Text>
              </Box>

              {/* KPI Card */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.500">
                  Stat Three
                </Text>
                <Text fontSize="2xl" fontWeight="bold" mt={1}>
                  —
                </Text>
              </Box>

              {/* KPI Card */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.500">
                  Stat Four
                </Text>
                <Text fontSize="2xl" fontWeight="bold" mt={1}>
                  —
                </Text>
              </Box>
            </Grid>

            {/* Charts */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {/* Chart */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
                h="320px"
              >
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Chart One
                </Text>
                <Box h="full" display="flex" alignItems="center" justifyContent="center">
                  <Text color="gray.400" fontSize="sm">
                    Chart goes here
                  </Text>
                </Box>
              </Box>

              {/* Chart */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
                h="320px"
              >
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Chart Two
                </Text>
                <Box h="full" display="flex" alignItems="center" justifyContent="center">
                  <Text color="gray.400" fontSize="sm">
                    Chart goes here
                  </Text>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
