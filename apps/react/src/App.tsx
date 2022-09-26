import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { AppTheme } from './theme';

export const App: FC = () => (
  <Provider store={store}>
    <HashRouter>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Suspense
          fallback={<div>Brrr... here should be your loader component</div>}
        >
          <AppTheme>
            <RootRouter />
          </AppTheme>
        </Suspense>
      </SnackbarProvider>
    </HashRouter>
  </Provider>
);
