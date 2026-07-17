import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { BookingsIcon, DashboardIcon, SpinnerIcon } from "../../components/admin/icons";
import { fetchOrders } from "../../services/adminOrders";

function computeStats(orders) {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const monthPrefix = today.slice(0, 7);

  const pending = orders.filter((order) => order.status === "pending").length;

  const upcomingDepartures = new Set(
    orders
      .flatMap((order) => order.order_items)
      .filter((item) => item.check_in >= today)
      .map((item) => item.departure_id),
  ).size;

  const activeTours = new Set(
    orders.flatMap((order) => order.order_items).map((item) => item.tour_slug),
  ).size;

  const revenueCents = orders
    .filter((order) => order.status !== "cancelled" && order.created_at.startsWith(monthPrefix))
    .reduce((sum, order) => sum + order.subtotal_cents, 0);

  return [
    { label: "Total bookings", value: String(orders.length), icon: BookingsIcon },
    { label: "Pending bookings", value: String(pending), icon: BookingsIcon },
    { label: "Upcoming departures", value: String(upcomingDepartures), icon: DashboardIcon },
    { label: "Revenue (this month)", value: `€ ${(revenueCents / 100).toFixed(2)}`, icon: DashboardIcon },
    { label: "Active tours", value: String(activeTours), icon: DashboardIcon },
  ];
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!orders) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center py-16">
          <SpinnerIcon className="h-8 w-8 text-brand" />
        </div>
      </AdminLayout>
    );
  }

  const stats = computeStats(orders);
  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[16px] border border-gray-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-pale text-brand">
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-sans text-2xl font-bold text-black">{stat.value}</p>
            <p className="mt-1 font-sans text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[16px] border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="m-0 font-serif text-xl font-semibold text-black">Recent bookings</h2>
          <Link
            to="/admin/dashboard/bookings"
            className="font-sans text-sm font-semibold text-brand no-underline hover:underline"
          >
            View all →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="mt-4 font-sans text-sm text-text-muted">No bookings yet.</p>
        ) : (
          <ul className="m-0 mt-4 list-none space-y-3 p-0">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="font-sans text-sm text-black">
                  <strong>{order.order_number}</strong> — {order.first_name} {order.last_name}
                </span>
                <span className="font-sans text-sm text-text-muted">{order.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  );
}
