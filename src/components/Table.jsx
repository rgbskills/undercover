import React from "react";

const Table = ({cols, children}) => {
  const columnNumber = cols.length;

  const Header = () => (
    <div className={`bg-blue-950 uppercase text-xs rounded-md h-12 px-6 font-semibold grid grid-cols-${columnNumber} gap-6`}>
      {cols.map((col) => (
        <>
          <div className="flex items-center">
            {col}
          </div>
        </>
      ))}
    </div>
  )

  return (
    <div>
      <Header />
        <div className={`px-6 grid grid-cols-${columnNumber} gap-6 my-5`}>
          {children}
        </div>
      <Header />
    </div>
  )
}

export default Table;