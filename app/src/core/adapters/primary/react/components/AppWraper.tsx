import { Dependencies } from '@/core/store/dependencies';
import { AppStore, createStore } from '@/core/store/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { app } from '../main';
import { DependenciesProvider } from './DependenciesProvider';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();

  const dependencies: Dependencies = app.dependencies;

  if (!storeRef.current) {
    storeRef.current = createStore({
      dependencies,
    });
  }

  return (
    <Provider store={storeRef.current}>
      <DependenciesProvider dependencies={dependencies}>{children}</DependenciesProvider>
    </Provider>
  );
}
