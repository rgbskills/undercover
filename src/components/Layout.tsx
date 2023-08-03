import React, { ReactNode } from 'react';

interface LayoutProps {
  narrow?: boolean;
  sidebar?: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ narrow, sidebar, children }) => {
  return (
    <div className={`${narrow ? "max-w-[305px]" : ""} mb-12 mx-4`}>
      {sidebar ? (
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-3">
            {sidebar}
          </div>
          <div className="col-span-9">
            {children}
          </div>
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;