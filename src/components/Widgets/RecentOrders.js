import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersAdmin } from "store/actions";

const RecentOrders = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
  dispatch(getOrdersAdmin());
  }, [])

const response = useSelector((state)=>state);
console.log("response:", response)

const totalOrders = response?.admin?.Orders?.totalOrders;
console.log("total orders:", totalOrders);

const clientOrders = useSelector((state)=> state?.admin?.Orders?.rows);
console.log("Order Details Response:", clientOrders)

  const recentOrders = [
    {
      id: "#1212",
      invoice: "INV-001001",
      customerName: "Cristian Joy",
      customerEmail: "cristian@example.com",
      amount: "120.40",
      status: "Pending",
      labelClass: "badge-info",
    },
    {
      id: "#1213",
      invoice: "INV-001003",
      customerName: "Donatella Arin",
      customerEmail: "conatella@example.com",
      amount: "180.40",
      status: "Paid",
      labelClass: "badge-success",
    },
    {
      id: "#1214",
      invoice: "INV-001004",
      customerName: " Slurs",
      customerEmail: "vikram@example.com",
      amount: "200.40",
      status: "Canceled",
      labelClass: "badge-danger",
    },
    {
      id: "#1215",
      invoice: "INV-001005",
      customerName: "Juan Rodriquez",
      customerEmail: "juan@example.com",
      amount: "158.40",
      status: "Canceled",
      labelClass: "badge-danger",
    },
    {
      id: "#1216",
      invoice: "INV-001006",
      customerName: "Christia Slurs",
      customerEmail: "christia@example.com",
      amount: "120.40",
      status: "Pending",
      labelClass: "badge-info",
    },
  ];

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Phone</th>
            <th>Amount</th>
            {/* <th>Profitment</th> */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clientOrders &&
            clientOrders.map((order, key) => (
              <tr key={key}>
                <td>{order.id}</td>
                <td>{order.phone || ""}</td>
                <td>
                  <span className="d-block fw-normal">
                    {order.amount}
                  </span>
                  {/* <span className="fs-12">{order.customerEmail}</span> */}
                </td>
                {/* <td>${order.amount}</td> */}
                <td>
                  <span className={order?.status === "pending" ? "bg-danger text-light px-2 rounded" : "bg-success text-light px-2 rounded"}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
