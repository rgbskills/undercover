import React, { ReactNode } from "react";

type TableProps = {
  cols: string[];
  children: ReactNode;
  tableHeadClassName?: string;
};

const Table: React.FC<TableProps> = ({ cols, children, tableHeadClassName }) => {
  const columnNumber = cols.length;

  const Header: React.FC = () => (
    <div className={`bg-blue-950 uppercase text-xs rounded-md h-12 px-6 font-semibold ${tableHeadClassName ? tableHeadClassName : ""}`}>
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
      <div>
        {children}
      </div>
      <Header />
    </div>
  );
};

export default Table;