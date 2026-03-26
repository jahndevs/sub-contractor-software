import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from '@/components/ui/color-mode';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAuth, ClerkProvider } from '@clerk/react';
import { trpc } from './trpc/client';
import { rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { signInRoute } from './routes/sign-in';
import { dashboardRoute } from './routes/dashboard';

const routeTree = rootRoute.addChildren([indexRoute, signInRoute, dashboardRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function TRPCProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const queryClient = useMemo(() => new QueryClient(), []);

  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: 'http://localhost:4000/trpc',
            transformer: superjson,
            async headers() {
              const token = await getToken();
              return token ? { Authorization: `Bearer ${token}` } : {};
            },
          }),
        ],
      }),
    [getToken],
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
      signInUrl="/sign-in"
      signUpUrl="/sign-in"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      routerPush={(to) => router.navigate({ to })}
      routerReplace={(to) => router.navigate({ to, replace: true })}
    >
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider forcedTheme="light">
          <TRPCProvider>
            <RouterProvider router={router} />
            <Toaster />
          </TRPCProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
