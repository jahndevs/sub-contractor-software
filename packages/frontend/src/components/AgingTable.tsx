import { Box, Flex, Text } from '@chakra-ui/react';

type AgingRow = {
  label: string;
  percent: number;
};

type FooterRow = {
  label: string;
  value: string;
  valueColor?: string;
};

type AgingTableProps = {
  title: string;
  rows: AgingRow[];
  footer: FooterRow[];
};

function rowColor(label: string, percent: number): string {
  if (label.startsWith('91')) return '#FC8181'; // red.300
  if (percent === 0) return '#CBD5E0';           // gray.300
  if (label.startsWith('61')) return '#F6AD55'; // orange.300
  if (label.startsWith('31')) return '#F6E05E'; // yellow.300
  return '#68D391';                             // green.300
}

function textColor(label: string, percent: number): string {
  if (label.startsWith('91')) return 'red.400';
  if (percent === 0) return 'gray.400';
  if (label.startsWith('61')) return 'orange.400';
  if (label.startsWith('31')) return 'yellow.500';
  return 'green.500';
}

export function AgingTable({ title, rows, footer }: AgingTableProps) {
  return (
    <Box bg="white" borderRadius="xl" borderWidth="1px" borderColor="gray.200" boxShadow="sm" overflow="hidden">
      <Box px={5} py={4} borderBottomWidth="1px" borderColor="gray.100">
        <Text fontSize="sm" fontWeight="semibold" color="gray.700">{title}</Text>
      </Box>

      <Box px={5} pt={4} pb={3} display="flex" flexDirection="column" gap={3}>
        {rows.map((row) => (
          <Flex key={row.label} align="center" gap={3}>
            <Text fontSize="xs" color="gray.500" w="16" flexShrink={0}>{row.label}</Text>
            <Box flex="1" bg="gray.100" borderRadius="full" h="5px" overflow="hidden">
              <Box
                h="100%"
                w={`${row.percent}%`}
                bg={rowColor(row.label, row.percent)}
                borderRadius="full"
              />
            </Box>
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={textColor(row.label, row.percent)}
              w="10"
              textAlign="right"
              flexShrink={0}
            >
              {row.percent.toFixed(1)}%
            </Text>
          </Flex>
        ))}
      </Box>

      <Box px={5} pb={4} display="flex" flexDirection="column" gap={1.5} borderTopWidth="1px" borderColor="gray.100" pt={3}>
        {footer.map((item) => (
          <Flex key={item.label} justify="space-between" align="center">
            <Text fontSize="xs" color="gray.500">{item.label}</Text>
            <Text fontSize="xs" fontWeight="semibold" color={item.valueColor ?? 'gray.800'}>
              {item.value}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
