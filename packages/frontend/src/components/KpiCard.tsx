import { Box, Flex, Text } from '@chakra-ui/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type Trend = {
  value: string; 
  label?: string;
  signal?: boolean;    
};

type KpiCardProps = {
  label: string;
  value?: string;
  valueColor?: string;
  subtext?: string;
  trend?: Trend;
};

export function KpiCard({ label, value, valueColor, subtext, trend }: KpiCardProps) {
  const isPositive = trend?.value.startsWith('+');
  const isNegative = trend?.value.startsWith('-');
  const trendColor = isPositive ? 'green.500' : isNegative ? 'red.500' : 'gray.400';
  const iconColor = isPositive ? '#38a169' : isNegative ? '#e53e3e' : '#a0aec0';
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      px={5}
      pt={5}
      pb={4}
      display="flex"
      flexDirection="column"
      gap={2}
      _hover={{ boxShadow: 'md', borderColor: 'gray.300' }}
      transition="box-shadow 0.15s ease, border-color 0.15s ease"
    >
      <Text fontSize="xs" fontWeight="medium" color="gray.400" letterSpacing="wide" textTransform="uppercase">
        {label}
      </Text>

      {value && (
        <Text fontSize="2xl" fontWeight="bold" color={valueColor ?? 'gray.900'} lineHeight="1.2">
          {value}
        </Text>
      )}
      {subtext && (
        <Text fontSize="sm" color="gray.400" mt={1}>
          {subtext}
        </Text>
      )}

      {trend && (
        <Flex align="center" gap={1} mt={1}>
          {trend.signal !== false && (
            <TrendIcon size={15} color={iconColor} />
          )}
          <Text fontSize="sm" fontWeight="semibold" color={trendColor}>
            {trend.value}%
          </Text>
          {trend.label && (
            <Text fontSize="sm" color="gray.400">
              {trend.label}
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
}
