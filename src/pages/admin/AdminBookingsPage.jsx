import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { SpinnerIcon } from "../../components/admin/icons";
import { fetchOrders, updateOrderStatus } from "../../services/adminOrders";
import { formatDisplayDate } from "../../utils/bookingPricing";

const STATUSES = ["pending", "contacted", "confirmed", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  confirmed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-500",
};

function formatEuroFromCents(cents) {
  return `€ ${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-sans text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function OrderRow({ order, expanded, onToggle, onStatusChange }) {
  const tourSummary = order.order_items.map((item) => item.tour_title).join(", ");

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
      >
        <td className="px-4 py-3 font-sans text-sm font-semibold text-black">{order.order_number}</td>
        <td className="px-4 py-3 font-sans text-sm text-text-muted">
          {formatDisplayDate(order.created_at.slice(0, 10))}
        </td>
        <td className="px-4 py-3 font-sans text-sm text-black">
          {order.first_name} {order.last_name}
        </td>
        <td className="px-4 py-3 font-sans text-sm text-text-muted">{tourSummary}</td>
        <td className="px-4 py-3 font-sans text-sm font-semibold text-black">
          {formatEuroFromCents(order.subtotal_cents)}
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={order.status} />
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-100 bg-gray-50">
          <td colSpan={6} className="px-4 py-5">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="m-0 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Contact
                </h3>
                <p className="mt-2 font-sans text-sm text-black">
                  <a href={`mailto:${order.email}`} className="text-brand no-underline hover:underline">
                    {order.email}
                  </a>
                  <br />
                  <a href={`tel:${order.phone}`} className="text-brand no-underline hover:underline">
                    {order.phone}
                  </a>
                </p>
                <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Billing address
                </h3>
                <p className="mt-2 font-sans text-sm text-black">
                  {order.address}
                  {order.apartment ? `, ${order.apartment}` : ""}
                  <br />
                  {order.city}, {order.postal_code} {order.state}
                  <br />
                  {order.country}
                  {order.company ? ` · ${order.company}` : ""}
                </p>
                {order.note && (
                  <>
                    <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Note
                    </h3>
                    <p className="mt-2 font-sans text-sm text-black">{order.note}</p>
                  </>
                )}
              </div>

              <div>
                <h3 className="m-0 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Items
                </h3>
                <ul className="m-0 mt-2 list-none space-y-3 p-0">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="font-sans text-sm text-black">
                      <strong>{item.tour_title}</strong> — {item.guests} guest(s)
                      <br />
                      <span className="text-text-muted">
                        {formatDisplayDate(item.check_in)} → {formatDisplayDate(item.check_out)}
                      </span>
                      {item.addons?.length > 0 && (
                        <span className="text-text-muted">
                          {" "}
                          · add-ons: {item.addons.map((addon) => `${addon.id} ×${addon.quantity}`).join(", ")}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Status
                </h3>
                <select
                  value={order.status}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => onStatusChange(order.id, event.target.value)}
                  className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2 font-sans text-sm text-black outline-none focus:border-brand"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminBookingsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load bookings.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleStatusChange(orderId, status) {
    const previous = orders;
    setOrders((current) => current.map((o) => (o.id === orderId ? { ...o, status } : o)));
    try {
      await updateOrderStatus(orderId, status);
    } catch {
      setOrders(previous);
    }
  }

  return (
    <AdminLayout title="Bookings">
      {loading && (
        <div className="flex justify-center py-16">
          <SpinnerIcon className="h-8 w-8 text-brand" />
        </div>
      )}

      {!loading && error && (
        <p className="font-sans text-sm text-brand">{error}</p>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="font-sans text-sm text-text-muted">No bookings yet.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto rounded-[16px] border border-gray-200 bg-white">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Order
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Date
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Customer
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Tour
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Total
                </th>
                <th className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  expanded={expandedId === order.id}
                  onToggle={() => setExpandedId((current) => (current === order.id ? null : order.id))}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
