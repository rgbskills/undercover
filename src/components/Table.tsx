import React, { ReactNode } from "react";

type TableProps = {
  cols: string[];
  children: ReactNode;
};

const Table: React.FC<TableProps> = ({ cols, children }) => {
  const columnNumber = cols.length;

  const Header: React.FC = () => (
    <div className={`bg-blue-950 uppercase text-xs rounded-md h-12 px-6 font-semibold grid grid-cols-${columnNumber} gap-6`}>
      {cols.map((col, index) => (
        <div key={index} className={`flex items-center ${columnNumber-1 === index ? "justify-end" : ""}`}>
          {col}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Header />
      <div className={`px-6 grid grid-cols-${columnNumber} gap-6 my-5`}>
        {children}
      </div>
      <Header />
    </div>
  );
};

export default Table;