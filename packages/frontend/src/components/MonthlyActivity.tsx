import { Box, Flex, Text } from '@chakra-ui/react';

const rows = [
  { label: 'Billing this Month', value: '$284K' },
  { label: 'Receipts this Month', value: '$310K' },
  { label: 'Invoices Raised', value: '12' },
  { label: 'Payments Made', value: '8' },
  { label: 'Open POs', value: '$142K' },
];

export function MonthlyActivity() {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" boxShadow="sm" overflow="hidden">
      <Box px={5} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">Monthly Activity</Text>
      </Box>
      <Box>
        {rows.map((row, i) => (
          <Flex
            key={row.label}
            align="center"
            justify="space-between"
            px={5}
            py={3}
            bg={i % 2 === 0 ? 'white' : 'gray.50'}
            borderBottomWidth={i < rows.length - 1 ? '1px' : '0'}
            borderColor="gray.100"
          >
            <Text fontSize="sm" color="gray.600">{row.label}</Text>
            <Text fontSize="sm" fontWeight="semibold" color="gray.900">{row.value}</Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
