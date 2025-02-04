import { createContext, useContext } from 'react';
import { Dependencies } from '../../../../store/dependencies';

const DependenciesContext = createContext<Dependencies | null>(null);

export function DependenciesProvider({
  dependencies,
  children,
}: {
  dependencies: Dependencies;
  children: React.ReactNode;
}) {
  return (
    <DependenciesContext.Provider value={dependencies}>{children}</DependenciesContext.Provider>
  );
}

export const useDependencies = () => useContext(DependenciesContext);
