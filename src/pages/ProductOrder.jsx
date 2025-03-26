import { useState, useEffect } from "react";
import axios from "axios";
import Status from "../components/Status.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProductOrder() {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const { user } = useAuth(); // Get logged-in user

  useEffect(() => {
    if (!user || !user.username) return; // Ensure user is logged in

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/nasara/get-orders`
        );
        console.log("Fetched Orders:", response.data); // Debugging log

        // Filter orders where at least one product was created by the logged-in user
        const filteredOrders = response.data.filter((order) =>
          order.cart.some((item) => item.author === user.username)
        );

        console.log("Filtered Orders (Matching user):", filteredOrders); // Debugging log
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  useEffect(() => {
    if (orders.length === 0) return; // Avoid API call if no orders

    const fetchUserDetails = async () => {
      const userIds = [...new Set(orders.map((order) => order.userId))];

      try {
        const response = await fetch(
          `${import.meta.env.VITE_NASARA_BACKEND_URI}/users/details`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds }),
          }
        );
        const data = await response.json();

        const userDataMap = {};
        data.forEach((user) => {
          userDataMap[user._id] = { email: user.email, address: user.address };
        });

        console.log("Fetched User Details:", userDataMap); // Debugging log
        setUserDetails(userDataMap);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [orders]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Order List</h1>

      {orders.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 text-gray-500 rounded-md mt-5">
          No orders available.
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 my-3 rounded shadow-sm bg-white"
          >
            <p className="text-sm bg-gray-100 p-2 rounded font-medium">
              Order ID: <span className="font-semibold">{order._id}</span>
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded font-medium mt-2">
              Delivery OTP:{" "}
              <span className="font-semibold">{order.deliveryOtp}</span>
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded font-medium mt-2">
              Delivery Address:{" "}
              <span className="font-semibold">
                {userDetails[order.userId]?.address || "Loading..."}
              </span>
            </p>
            <p className="text-sm bg-gray-100 p-2 rounded font-medium mt-2">
              Email:{" "}
              <span className="font-semibold">
                {userDetails[order.userId]?.email || "Loading..."}
              </span>
            </p>

            {order.cart
              .filter((item) => item.author === user.username) // Filter only matching products
              .map((item, i) => (
                <div key={i} className="my-5 pb-3 border-b border-gray-300">
                  <h1 className="font-semibold">Item: {i + 1}</h1>
                  <div className="flex gap-3">
                    <img
                      src={item.images[0]}
                      className="h-20 rounded-md shadow-sm border border-gray-300"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p>₹{item.price}</p>
                      <p className="text-gray-500">
                        {item.quantity} {item.unit}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    Total: ₹{item.price} × {item.NumberOfItem} ={" "}
                    <span className="font-medium">
                      ₹{item.price * item.NumberOfItem}
                    </span>
                  </p>
                </div>
              ))}

            <div className="mt-2 bg-gray-100 p-3 rounded">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>
                  ₹
                  {order.cart
                    .filter((item) => item.author === user.username)
                    .reduce((acc, item) => acc + item.price * item.NumberOfItem, 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (18%)</span>
                <span>
                  ₹
                  {(
                    order.totalAmount * 0.18
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Charge</span>
                <span>₹{Math.ceil(order.totalAmount / 1000) * 10}</span>
              </div>
              <hr className="my-2 border-gray-400" />
              <div className="flex justify-between font-semibold text-base">
                <span>Payable Amount</span>
                <span>
                  ₹
                  {(
                    order.totalAmount +
                    order.totalAmount * 0.18 +
                    Math.ceil(order.totalAmount / 1000) * 10
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <Status cartId={order._id} currentStatus={order.status} />
          </div>
        ))
      )}
    </div>
  );
}
