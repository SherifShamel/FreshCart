import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'checkout/:c_id', renderMode: RenderMode.Client },
  { path: 'p_details/:p_id', renderMode: RenderMode.Client },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
];
