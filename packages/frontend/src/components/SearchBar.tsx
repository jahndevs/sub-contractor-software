import { Input, Box } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export function SearchBar() {
  return (
    <Box position="relative" w="64">
      <Box
        position="absolute"
        left={2}
        top="50%"
        transform="translateY(-50%)"
        color="gray.400"
        pointerEvents="none"
        zIndex={1}
      >
        <FiSearch size={14} />
      </Box>
      <Input
        placeholder="Search..."
        size="sm"
        borderRadius="md"
        bg="white"
        pl={7}
        _placeholder={{ color: 'gray.400' }}
      />
    </Box>
  );
}
