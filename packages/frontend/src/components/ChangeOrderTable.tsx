import { Box, Flex, Text } from '@chakra-ui/react';

const rows = [
  { type: 'Contract C/Os', approved: '3', submitted: '0' },
  { type: 'T&M Approvals', approved: '8', submitted: '0' },
  { type: 'Submitted C/Os', approved: '—', submitted: '5' },
];

export function ChangeOrderTable() {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" boxShadow="sm" overflow="hidden">
      {/* Header */}
      <Box px={5} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">Change Orders</Text>
      </Box>

      {/* Column headers */}
      <Flex px={5} py={2} bg="gray.50" borderBottomWidth="1px" borderColor="gray.100">
        <Text flex="1" fontSize="xs" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wide">
          Type
        </Text>
        <Text w="24" textAlign="right" fontSize="xs" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wide">
          Approved
        </Text>
        <Text w="24" textAlign="right" fontSize="xs" fontWeight="semibold" color="gray.400" textTransform="uppercase" letterSpacing="wide">
          Submitted
        </Text>
      </Flex>

      {/* Rows */}
      {rows.map((row, i) => (
        <Flex
          key={row.type}
          align="center"
          px={5}
          py={3}
          bg={i % 2 === 0 ? 'white' : 'gray.50'}
          borderBottomWidth={i < rows.length - 1 ? '1px' : '0'}
          borderColor="gray.100"
        >
          <Text flex="1" fontSize="sm" color="gray.600">{row.type}</Text>
          <Text w="24" textAlign="right" fontSize="sm" fontWeight="semibold" color="gray.900">{row.approved}</Text>
          <Text w="24" textAlign="right" fontSize="sm" fontWeight="semibold" color="gray.900">{row.submitted}</Text>
        </Flex>
      ))}

      {/* Footer note */}
      <Box px={5} py={3} borderTopWidth="1px" borderColor="gray.100" bg="gray.50">
        <Text fontSize="xs" color="gray.400">Approved jobs since 02/01: <Text as="span" fontWeight="semibold" color="gray.600">3</Text></Text>
      </Box>
    </Box>
  );
}
