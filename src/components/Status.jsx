import { useState } from "react";

const OrderStatus = ({ cartId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/status/cart/status/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
        <select
          className={`p-2 border rounded mt-3 ${
            status === "Pending"
              ? "bg-yellow-300"
              : status === "Shipped"
              ? "bg-orange-300"
              : status === "Delivered"
              ? "bg-green-300"
              : status === "Cancelled"
              ? "bg-red-300"
              : "bg-gray-200"
          }`}
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={loading}
        >
          <option className="bg-yellow-300" value="Pending">Pending</option>
          <option className="bg-orange-300" value="Shipped">Shipped</option>
          <option className="bg-green-300" value="Delivered">Delivered</option>
          <option className="bg-red-300 text-white" value="Cancelled">Cancelled</option>
        </select>

  );
};

export default OrderStatus;
