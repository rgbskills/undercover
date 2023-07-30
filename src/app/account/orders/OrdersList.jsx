"use client"
import React, {useState, useEffect} from "react";
import { format, formatDistanceToNow } from 'date-fns';
import Table from "@/components/Table";
import Dropdown from "@/components/Dropdown";
import { Icons } from "@/components/Icons";
import Button from "@/components/Button";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!orders || !orders.length) return <p>No orders data</p>

  const DrpbtnStyle = "h-7 text-xs text-white uppercase font-semibold hover:bg-blue-800 w-full transition-all"

  const MoreBtn = () => (
    <div className="h-7 px-1 hover:bg-blue-950 flex items-center rounded-md transition-all mr-2">
      <Icons.more />
    </div>
  );

  function formatTimestamp(timestamp) {
    const seconds = timestamp._seconds;
    const nanoseconds = timestamp._nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds);

    const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    const relativeTime = formatDistanceToNow(date, { addSuffix: true });

    return `${formattedDate} (${relativeTime})`;
  }

  return (
    <Table cols={["Order ID", "Date", "Total", "Actions"]} tableHeadClassName="grid grid-cols-4 gap-6">
      {orders.map((order) => (
        <div key={order.id} className="grid grid-cols-4 gap-6 px-6 my-5">
          <div className="text-xs flex items-center">
            {order.id}
          </div>
          <div className="text-sm flex gap-4 items-center">
            {formatTimestamp(order.createdAt)}
          </div>
          <div className="text-sm flex items-center">
            ${order.order_amount}
          </div>
          <div className="text-sm flex items-center justify-end">
            <Dropdown button={<MoreBtn />} className="min-w-[100px] rounded-sm">
              <Button
                unstyled
                className={DrpbtnStyle}
                onClick={() => console.log("View order")}
              >
                View
              </Button>
            </Dropdown>
          </div>
        </div>
      ))}
    </Table>
  );
};

export default OrdersList;