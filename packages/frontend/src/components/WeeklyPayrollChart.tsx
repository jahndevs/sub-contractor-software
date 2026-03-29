import { Box, Text } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { week: '01/03', amount: 69900 },
  { week: '01/10', amount: 46400 },
  { week: '01/17', amount: 68400 },
  { week: '01/24', amount: 68000 },
  { week: '01/31', amount: 65900 },
];

const colors = ['#9F7AEA', '#48BB78', '#4299E1', '#ED8936', '#F56565'];

function formatK(value: number) {
  return `$${(value / 1000).toFixed(1)}K`;
}

export function WeeklyPayrollChart() {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" boxShadow="sm" overflow="hidden">
      <Box px={5} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">Weekly Payroll (Last 5 Weeks)</Text>
      </Box>
      <Box px={4} py={4}>
        <ResponsiveContainer width="100%" height={210}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 48, left: 8, bottom: 0 }}
            barSize={18}
          >
            <XAxis
              type="number"
              tickFormatter={formatK}
              tick={{ fontSize: 11, fill: '#A0AEC0' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="week"
              tick={{ fontSize: 12, fill: '#718096' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip
              formatter={(value: number) => [formatK(value), 'Payroll']}
              cursor={{ fill: '#F7FAFC' }}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]} label={{ position: 'right', formatter: formatK, fontSize: 11, fill: '#718096' }}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
