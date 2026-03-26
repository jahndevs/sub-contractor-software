import { createRoute, useNavigate } from '@tanstack/react-router';
import { useUser, useAuth } from '@clerk/react';
import { useEffect, useState } from 'react';
import { Box, Grid, Text } from '@chakra-ui/react';
import { rootRoute } from './__root';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { RevenueVsCostChart } from '../components/RevenueVsCostChart';
import { ManHoursChart } from '../components/ManHoursChart';
import { JobsTable } from '../components/JobsTable';

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

  const kpiCards = [
    { label: 'Revenue this month', value: '$1.24M' },
    { label: 'Gross Margin (JTD Average)', value: '18.4%' },
    { label: 'Active Jobs', value: '14' },
    { label: 'Total Contract Value', value: '$8.7M' },
  ];

  const kpiCards2 = [
    { label: 'Man hours this month', value: '4800' },
    { label: 'Labour Cost/Hr (Avg)', value: '$62.40' },
    { label: 'Jobs Over Budget', value: '4' },
    { label: 'Forecast Variance (total)', value: '-$186K' },
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" h="100vh" overflow="hidden">
      <Navbar />
      <Box display="flex" flex="1" minHeight={0}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <Box flex="1" overflowY="auto" px={8} py={6}>
          <Box display="flex" flexDirection="column" gap={6}>
            {/* KPI Cards */}
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {kpiCards.map((card) => (
                <Box
                  key={card.label}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" color="gray.500">
                    {card.label}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" mt={1}>
                    {card.value}
                  </Text>
                </Box>
              ))}
            </Grid>

            {/* KPI Cards Row 2 */}
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {kpiCards2.map((card) => (
                <Box
                  key={card.label}
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  p={6}
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" color="gray.500">
                    {card.label}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" mt={1}>
                    {card.value}
                  </Text>
                </Box>
              ))}
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
              >
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Monthly Revenue vs. Cost (Last 12 Months)
                </Text>
                <RevenueVsCostChart />
              </Box>

              {/* Chart */}
              <Box
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                p={6}
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Man Hours: Budget vs. Actual
                </Text>
                <ManHoursChart />
              </Box>
            </Grid>

            {/* Jobs Table */}
            <Box
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              p={6}
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text fontSize="md" fontWeight="semibold" mb={4}>
                Active Jobs
              </Text>
              <JobsTable />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
