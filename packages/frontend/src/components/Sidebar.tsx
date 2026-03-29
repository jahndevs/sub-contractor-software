import { Box, Flex, Text, IconButton, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Send, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: "Hi! I'm your AI assistant. Ask me anything about your jobs, revenue, or reports.",
    },
  ]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: prev.length, role: 'user', content: trimmed }]);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <Box
      as="aside"
      w={collapsed ? '10' : '72'}
      flexShrink={0}
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      h="full"
      transition="width 0.2s ease"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        align="center"
        px={collapsed ? 0 : 4}
        py={3}
        borderBottomWidth="1px"
        borderColor="gray.200"
        justify={collapsed ? 'center' : 'space-between'}
        gap={2}
      >
        {!collapsed && (
          <Flex align="center" gap={2}>
            <Bot size={16} color="#718096" />
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              AI Assistant
            </Text>
            <Text fontSize="xs" color="gray.400">
              (coming soon)
            </Text>
          </Flex>
        )}
        <IconButton
          aria-label={collapsed ? 'Expand chat' : 'Collapse chat'}
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </IconButton>
      </Flex>

      {/* Messages */}
      {!collapsed && (
        <>
          <Box
            flex="1"
            overflowY="auto"
            px={4}
            py={4}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            {messages.map((msg) => (
              <Box
                key={msg.id}
                alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                maxW="85%"
                bg={msg.role === 'user' ? 'blue.500' : 'gray.100'}
                color={msg.role === 'user' ? 'white' : 'gray.800'}
                px={3}
                py={2}
                borderRadius="lg"
                fontSize="sm"
              >
                {msg.content}
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Flex px={3} py={3} borderTopWidth="1px" borderColor="gray.200" gap={2} align="center">
            <Input
              placeholder="Ask a question..."
              size="sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              borderRadius="md"
              flex="1"
            />
            <IconButton
              aria-label="Send message"
              size="sm"
              colorScheme="blue"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send size={14} />
            </IconButton>
          </Flex>
        </>
      )}
    </Box>
  );
}
