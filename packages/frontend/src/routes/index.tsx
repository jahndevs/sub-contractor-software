import { createRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { rootRoute } from './__root';
import { useAuth } from '@clerk/react';
import { useNavigate } from '@tanstack/react-router';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    navigate({ to: isSignedIn ? '/dashboard' : '/sign-in' });
  }, [isLoaded, isSignedIn, navigate]);

  return null;
}
