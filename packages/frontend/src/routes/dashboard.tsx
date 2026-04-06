import { createRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@clerk/react';
import { useEffect, useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { rootRoute } from './__root';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { KpiCard } from '../components/KpiCard';
import { RevenueVsCostChart } from '../components/RevenueVsCostChart';
import { JobsTable } from '../components/JobsTable';
import { ChangeOrderTable } from '../components/ChangeOrderTable';
import { WeeklyPayrollChart } from '../components/WeeklyPayrollChart';
import { MonthlyActivity } from '../components/MonthlyActivity';
import { AgingTable } from '../components/AgingTable';
import { AssetsSummary } from '../components/AssetsSummary';
import { DashboardGrid, type WidgetConfig, type SectionConfig } from '../components/DashboardGrid';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

const sections: SectionConfig[] = [
  { id: 'financial', title: 'Financial' },
  { id: 'projects', title: 'Projects' },
  { id: 'cash', title: 'Cash Positions & Assets' },
];

function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoaded, isSignedIn, navigate]);

  const widgets: WidgetConfig[] = useMemo(
    () => [
      {
        id: 'kpi-revenue',
        section: 'financial',
        colSpan: 3,
        content: <KpiCard label="Revenue this Month" value="$1.24M" trend={{ value: '+8', label: 'vs last month' }} />,
      },
      {
        id: 'kpi-gross-profit',
        section: 'financial',
        colSpan: 3,
        content: <KpiCard label="Gross Profit" value="$224K" trend={{ value: '18.4', label: 'margin', signal: false }} />,
      },
      {
        id: 'kpi-net-profit',
        section: 'financial',
        colSpan: 3,
        content: <KpiCard label="Net Profit" value="$84K" trend={{ value: '-10', label: 'below target' }} />,
      },
      {
        id: 'kpi-overhead',
        section: 'financial',
        colSpan: 3,
        content: <KpiCard label="Overhead Burn" value="$144K" trend={{ value: '11.6', label: 'of revenue', signal: false }} />,
      },
      {
        id: 'revenue-chart',
        section: 'financial',
        colSpan: 6,
        content: (
          <Box bg="white" borderRadius="xl" boxShadow="sm" p={5} borderWidth="1px" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="semibold" mb={4} color="gray.700">
              Monthly Revenue vs. Cost (Last 12 Months)
            </Text>
            <RevenueVsCostChart />
          </Box>
        ),
      },
      {
        id: 'monthly-activity',
        section: 'financial',
        colSpan: 6,
        content: <MonthlyActivity />,
      },
      {
        id: 'kpi-active-jobs',
        section: 'projects',
        colSpan: 3,
        content: <KpiCard label="Active Jobs" value="14" trend={{ value: '0', label: 'vs last month' }} />,
      },
      {
        id: 'kpi-backlog-contract',
        section: 'projects',
        colSpan: 3,
        content: <KpiCard label="Job Backlog — Contract" value="$5.13M" subtext="39 jobs" />,
      },
      {
        id: 'kpi-backlog-tm',
        section: 'projects',
        colSpan: 3,
        content: <KpiCard label="Job Backlog — T&M" value="$6.2K" subtext="1 job" />,
      },
      {
        id: 'kpi-forecast-variance',
        section: 'projects',
        colSpan: 3,
        content: <KpiCard label="Forecast Variance" value="-$186K" valueColor="red.400" subtext="across all jobs" />,
      },
      {
        id: 'weekly-payroll',
        section: 'projects',
        colSpan: 6,
        content: <WeeklyPayrollChart />,
      },
      {
        id: 'change-orders',
        section: 'projects',
        colSpan: 6,
        content: <ChangeOrderTable />,
      },
      {
        id: 'jobs-table',
        section: 'projects',
        colSpan: 12,
        content: (
          <Box bg="white" borderRadius="xl" boxShadow="sm" p={5} borderWidth="1px" borderColor="gray.200">
            <Text fontSize="sm" fontWeight="semibold" mb={4} color="gray.700">Active Jobs</Text>
            <JobsTable />
          </Box>
        ),
      },
      {
        id: 'kpi-cash-balance',
        section: 'cash',
        colSpan: 3,
        content: <KpiCard label="Cash Balance" value="-$1.00M" valueColor="red.500" />,
      },
      {
        id: 'kpi-cash-in',
        section: 'cash',
        colSpan: 3,
        content: <KpiCard label="Cash In" value="$0" subtext="since 03/01" />,
      },
      {
        id: 'kpi-cash-out',
        section: 'cash',
        colSpan: 3,
        content: <KpiCard label="Cash Out" value="$64.5K" subtext="since 03/01" />,
      },
      {
        id: 'kpi-net-cash',
        section: 'cash',
        colSpan: 3,
        content: <KpiCard label="Net Cash Position" value="+$676K" subtext="AR + Bank — AP" valueColor="green.500" />,
      },
      {
        id: 'ar-aging',
        section: 'cash',
        colSpan: 4,
        content: (
          <AgingTable
            title="Accounts Receivable — Aged"
            rows={[
              { label: '<30 days', percent: 7.0, value: '$19,206' },
              { label: '31 – 60', percent: 0.0, value: '$0' },
              { label: '61 – 90', percent: 1.7, value: '$4,664' },
              { label: '91+ days', percent: 91.3, value: '$250,494' },
            ]}
            footer={[
              { label: 'Total A/R', value: '$274,364' },
              { label: 'Retainage (held)', value: '$86,649', valueColor: 'orange.400' },
            ]}
          />
        ),
      },
      {
        id: 'ap-aging',
        section: 'cash',
        colSpan: 4,
        content: (
          <AgingTable
            title="Accounts Payable — Aged"
            rows={[
              { label: '<30 days', percent: 0.0, value: '$0' },
              { label: '31 – 60', percent: 0.0, value: '$0' },
              { label: '61 – 90', percent: 0.0, value: '$0' },
              { label: '91+ days', percent: 100.0, value: '$168,490' },
            ]}
            footer={[
              { label: 'Total A/P', value: '$168,490' },
              { label: 'Retainage (owed)', value: '$0' },
              { label: 'Open POs', value: '$142K', valueColor: 'orange.400' },
            ]}
          />
        ),
      },
      {
        id: 'assets-summary',
        section: 'cash',
        colSpan: 4,
        content: <AssetsSummary />,
      },
    ],
    [],
  );

  if (!isLoaded || !isSignedIn) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" h="100vh" overflow="hidden">
      <Navbar />
      <Box display="flex" flex="1" minHeight={0}>
        <Sidebar />
        <Box flex="1" overflowY="auto" px={8} py={6}>
          <DashboardGrid sections={sections} widgets={widgets} />
        </Box>
      </Box>
    </Box>
  );
}
