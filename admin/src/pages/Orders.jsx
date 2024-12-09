import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../../frontend/src/context/ShopContext'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
  console.log(token)
  const [orders, setOrders] = useState([])


  const fetchAllOrders = async () => {
    if (!token) {
      return null
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (e) {
      toast.error(e.message)
    }
  }


  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value }, // исправлено расположение параметров
        { headers: { token } } // добавлено правильное место для заголовков
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      // Убедитесь, что ошибка содержит `response` для обработки
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img className="w-12" src={assets.parcel_icon} alt="Parcel" />
              <div>
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p className="truncate">
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                </p>
              </div>
              <p>{order.address.phone}</p>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{`${order.currency} ${order.amount}`}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold border rounded-md hover:border-gray-400 focus:outline-none">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders available</p>
        )}
      </div>
    </div>
  );

}

export default Orders