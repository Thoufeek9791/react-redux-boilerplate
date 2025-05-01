import { createBrowserRouter } from 'react-router';

const pages = import.meta.glob('../pages/**/*.jsx', { eager: true });
const routes = Object.keys(pages).map((file) => {
  const mod = pages[file];

  let path = file
    .replace('../pages', '')
    .replace(/\/index\.jsx$/, '/')
    .replace(/\.jsx$/, '')
    .replace(/\[([^\]]+)\]/g, ':$1');

  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  const PageComponent = mod.default;
  const requiredRoles = mod.requiredRoles || [];

  let element = PageComponent ? <PageComponent /> : undefined;

  if (PageComponent && requiredRoles.length > 0) {
    element = (
      <ProtectedRoute requiredRoles={requiredRoles}>
        <PageComponent />
      </ProtectedRoute>
    );
  }

  return {
    path: path || '/',
    element,
    loader: mod.loader,
    action: mod.action,
    errorElement: mod.errorElement
  };
});

export const router = createBrowserRouter(routes);
