import { Box, Flex, Text, VStack, IconButton, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

type NavItem = {
  label: string;
  id: string;
};

const navItems: NavItem[] = [
  { label: 'Overview', id: 'overview' },
  { label: 'Projects', id: 'projects' },
];

type SidebarProps = {
  activeTab: string;
  onTabChange: (id: string) => void;
};

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      as="aside"
      w={collapsed ? '14' : '56'}
      flexShrink={0}
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
      py={4}
      px={collapsed ? 2 : 3}
      h="full"
      transition="width 0.2s ease, padding 0.2s ease"
      overflow="hidden"
    >
      {/* Toggle button */}
      <Flex justify={collapsed ? 'center' : 'flex-end'} mb={4}>
        <IconButton
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed((c) => !c)}
        >
          <Text fontSize="xs" fontWeight="bold" color="gray.500">
            {collapsed ? '›' : '‹'}
          </Text>
        </IconButton>
      </Flex>

      <VStack align="stretch" gap={1}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          const navRow = (
            <Flex
              key={item.id}
              align="center"
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              bg={isActive ? 'gray.100' : 'transparent'}
              _hover={{ bg: isActive ? 'gray.100' : 'gray.50' }}
              onClick={() => onTabChange(item.id)}
              justify={collapsed ? 'center' : 'flex-start'}
            >
              {/* placeholder */}
              <Box
                w="4"
                h="4"
                borderRadius="sm"
                bg={isActive ? 'gray.400' : 'gray.300'}
                flexShrink={0}
              />
              {!collapsed && (
                <Text
                  ml={3}
                  fontSize="sm"
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  color={isActive ? 'gray.900' : 'gray.600'}
                  whiteSpace="nowrap"
                >
                  {item.label}
                </Text>
              )}
            </Flex>
          );

          if (collapsed) {
            return (
              <Tooltip.Root key={item.id} positioning={{ placement: 'right' }}>
                <Tooltip.Trigger asChild>{navRow}</Tooltip.Trigger>
                <Tooltip.Content>{item.label}</Tooltip.Content>
              </Tooltip.Root>
            );
          }

          return navRow;
        })}
      </VStack>
    </Box>
  );
}
