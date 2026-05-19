import { Box, Button, Flex, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, LayoutDashboard, Folder } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Projects', icon: Folder },
];

export function Sidebar2() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      as="aside"
      w={collapsed ? '13' : '72'}
      flexShrink={0}
      bg="bg.sidebar"
      borderRightWidth="1px"
      borderColor="border"
      display="flex"
      flexDirection="column"
      h="full"
      transition="width 0.2s ease"
      overflow="hidden"
    >
      <Flex
        align="center"
        px={collapsed ? 2 : 4}
        py={4}
        borderBottomWidth="1px"
        borderColor="gray.200"
        justify="space-between"
      >
        {!collapsed && (
          <Text fontSize="lg" fontWeight="bold">
            
          </Text>
        )}
        <IconButton
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          variant="ghost"
          size="sm"
          color="gray.600"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </IconButton>
      </Flex>

      <VStack as="nav" align="stretch" gap={1} px={collapsed ? 1 : 3} py={4}>
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            justifyContent={collapsed ? 'center' : 'flex-start'}
            w="full"
            fontWeight="medium"
            color="text.sidebar"
            _hover={{ bg: 'brand.50' }}
          >
            <Icon as={item.icon} boxSize={4} mr={collapsed ? 0 : 2} />
            {!collapsed && item.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
}
