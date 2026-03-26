import { useMemo, useState } from 'react';
import { Badge, Box, Button, HStack, Input, Table, Text } from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type Job = {
  name: string;
  contractValue: number;
  spentJTD: number;
  claimedPct: number;
  forecastAtCompletion: number;
  variance: number;
  manHours: number;
  status: string;
};

const jobs: Job[] = [
  { name: 'Northgate Substation Upgrade', contractValue: 1200000, spentJTD: 820000, claimedPct: 68, forecastAtCompletion: 1185000, variance: 15000, manHours: 6240, status: 'On Track' },
  { name: 'Riverdale Solar Farm – Civil', contractValue: 2450000, spentJTD: 1980000, claimedPct: 81, forecastAtCompletion: 2610000, variance: -160000, manHours: 14800, status: 'Over Budget' },
  { name: 'Westfield Retail Fitout', contractValue: 680000, spentJTD: 210000, claimedPct: 31, forecastAtCompletion: 670000, variance: 10000, manHours: 1920, status: 'On Track' },
  { name: 'CBD Tower – Level 18–22 Electrical', contractValue: 3100000, spentJTD: 2750000, claimedPct: 89, forecastAtCompletion: 3240000, variance: -140000, manHours: 21600, status: 'Over Budget' },
  { name: 'Harbour Bridge Maintenance', contractValue: 540000, spentJTD: 90000, claimedPct: 17, forecastAtCompletion: 535000, variance: 5000, manHours: 720, status: 'On Track' },
  { name: 'Eastern Freeway Lighting', contractValue: 890000, spentJTD: 445000, claimedPct: 50, forecastAtCompletion: 910000, variance: -20000, manHours: 3800, status: 'At Risk' },
  { name: 'Greenfield Data Centre – Fit-out', contractValue: 1750000, spentJTD: 620000, claimedPct: 35, forecastAtCompletion: 1720000, variance: 30000, manHours: 5100, status: 'On Track' },
  { name: 'Port Logistics Hub – Stage 2', contractValue: 4200000, spentJTD: 3800000, claimedPct: 90, forecastAtCompletion: 4380000, variance: -180000, manHours: 28400, status: 'Over Budget' },
  { name: 'Southern Ring Road – Signalling', contractValue: 960000, spentJTD: 310000, claimedPct: 32, forecastAtCompletion: 950000, variance: 10000, manHours: 2600, status: 'On Track' },
  { name: 'Metro Station – Platform Upgrade', contractValue: 1480000, spentJTD: 880000, claimedPct: 59, forecastAtCompletion: 1530000, variance: -50000, manHours: 7200, status: 'At Risk' },
];

type SortKey = keyof Job;
type SortDir = 'asc' | 'desc';

const PAGE_SIZE = 5;

const fmtCurrency = (n: number) =>
  (n < 0 ? '-$' : '+$') + Math.abs(n).toLocaleString();

const fmtMoney = (n: number) => '$' + n.toLocaleString();

const statusColor: Record<string, 'green' | 'red' | 'orange'> = {
  'On Track': 'green',
  'Over Budget': 'red',
  'At Risk': 'orange',
};

type Column = { label: string; key: SortKey; align: 'left' | 'right' | 'center' };

const columns: Column[] = [
  { label: 'Job', key: 'name', align: 'left' },
  { label: 'Contract Value', key: 'contractValue', align: 'right' },
  { label: 'Spent JTD', key: 'spentJTD', align: 'right' },
  { label: 'Claimed %', key: 'claimedPct', align: 'right' },
  { label: 'Forecast @ Completion', key: 'forecastAtCompletion', align: 'right' },
  { label: 'Variance', key: 'variance', align: 'right' },
  { label: 'Man Hours', key: 'manHours', align: 'right' },
  { label: 'Status', key: 'status', align: 'center' },
];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey | null; sortDir: SortDir | null }) {
  if (col !== sortKey) return <FiChevronDown size={12} opacity={0.3} />;
  return sortDir === 'asc' ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />;
}

export function JobsTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir | null>(null);
  const [page, setPage] = useState(1);

  const handleSort = (key: SortKey) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jobs.filter((j) => j.name.toLowerCase().includes(q));
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Input
        placeholder="Search jobs..."
        size="sm"
        maxW="320px"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />

      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader
                key={col.key}
                textAlign={col.align}
                cursor="pointer"
                userSelect="none"
                onClick={() => handleSort(col.key)}
                _hover={{ bg: 'bg.subtle' }}
              >
                <HStack gap={1} justify={col.align === 'right' ? 'flex-end' : col.align === 'center' ? 'center' : 'flex-start'}>
                  <Text>{col.label}</Text>
                  <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                </HStack>
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginated.map((job) => (
            <Table.Row key={job.name} cursor="pointer" _hover={{ bg: 'bg.subtle' }}>
              <Table.Cell fontWeight="medium">{job.name}</Table.Cell>
              <Table.Cell textAlign="right">{fmtMoney(job.contractValue)}</Table.Cell>
              <Table.Cell textAlign="right">{fmtMoney(job.spentJTD)}</Table.Cell>
              <Table.Cell textAlign="right">{job.claimedPct}%</Table.Cell>
              <Table.Cell textAlign="right">{fmtMoney(job.forecastAtCompletion)}</Table.Cell>
              <Table.Cell
                textAlign="right"
                color={job.variance < 0 ? 'red.500' : 'green.500'}
                fontWeight="medium"
              >
                {fmtCurrency(job.variance)}
              </Table.Cell>
              <Table.Cell textAlign="right">{job.manHours.toLocaleString()}</Table.Cell>
              <Table.Cell textAlign="center">
                <Badge colorPalette={statusColor[job.status]} size="sm">
                  {job.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
          {paginated.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={8} textAlign="center" color="gray.400" py={6}>
                No jobs found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.500">
          {sorted.length === 0 ? 'No results' : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, sorted.length)} of ${sorted.length}`}
        </Text>
        <HStack gap={2}>
          <Button size="xs" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              size="xs"
              variant={page === i + 1 ? 'solid' : 'outline'}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button size="xs" variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
