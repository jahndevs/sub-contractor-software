const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = {
  config,
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  semanticTokens: {
    colors: {
      'bg.nav': {
        default: 'brand.600',
        _dark: 'brand.500',
      },
      'bg.sidebar': {
        default: 'brand.50',
        _dark: 'gray.900',
      },
      'bg.dashboard': {
        default: 'gray.100',
        _dark: 'gray.900',
      },
      'bg.widget': {
        default: 'white',
        _dark: 'gray.700',
      },
      'bg.widgetHeader': {
        default: 'gray.50',
        _dark: 'gray.600',
      },
      border: {
        default: 'gray.200',
        _dark: 'gray.600',
      },
      'border.subtle': {
        default: 'gray.200',
        _dark: 'gray.500',
      },
      'text.nav': {
        default: 'white',
        _dark: 'white',
      },
      'text.sidebar': {
        default: 'gray.800',
        _dark: 'gray.100',
      },
      'text.dashboard': {
        default: 'gray.700',
        _dark: 'gray.100',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'bg.dashboard',
        color: 'gray.800',
        minHeight: '100vh',
      },
      '#root': {
        minHeight: '100vh',
      },
    },
  },
};

export default theme;
