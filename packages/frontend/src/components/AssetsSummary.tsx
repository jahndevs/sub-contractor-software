import { Box, Flex, Text } from '@chakra-ui/react';

type AssetRow = {
  label: string;
  value: string;
  valueColor?: string;
};

const rows: AssetRow[] = [
  { label: 'Cash & equivalents', value: '-$1.00M', valueColor: 'red.500' },
  { label: 'Accounts receivable', value: '$274K' },
  { label: 'Retainage receivable', value: '$86.6K', valueColor: 'orange.400' },
  { label: 'WIP (unbilled earned)', value: '$214K' },
  { label: 'Equipment (net)', value: '$890K' },
  { label: 'Vehicles (net)', value: '$340K' },
];

export function AssetsSummary() {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" boxShadow="sm" overflow="hidden">
      <Box px={5} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">Assets Summary</Text>
      </Box>

      <Box px={5} pt={3} pb={4} display="flex" flexDirection="column" gap={2.5}>
        {rows.map((row, i) => (
          <Flex key={row.label} justify="space-between" align="center" pb={i < rows.length - 1 ? 2 : 0} borderBottomWidth={i < rows.length - 1 ? '1px' : '0'} borderColor="gray.50">
            <Text fontSize="sm" color="gray.500">{row.label}</Text>
            <Text fontSize="sm" fontWeight="semibold" color={row.valueColor ?? 'gray.800'}>{row.value}</Text>
          </Flex>
        ))}

        <Flex justify="space-between" align="center" pt={2} borderTopWidth="2px" borderColor="gray.200" mt={1}>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700">Total assets</Text>
          <Text fontSize="sm" fontWeight="bold" color="gray.900">$1.80M</Text>
        </Flex>
      </Box>
    </Box>
  );
}
