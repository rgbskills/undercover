import React, { ReactNode } from 'react';

interface LayoutProps {
  narrow?: boolean;
  wide?: boolean;
  sidebar?: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ narrow, wide, sidebar, children }) => {
  // Define the default layout classes
  let layoutClasses = 'w-full max-w-[1200px] mx-auto px-4';

  // Update classes based on the provided props
  if (narrow) {
    layoutClasses = 'w-full max-w-[305px] mx-auto px-4';
  } else if (wide) {
    layoutClasses = 'w-full max-w-[1600px] mx-auto px-4';
  }

  return (
    <div className={layoutClasses}>
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