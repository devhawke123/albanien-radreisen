import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  adminCard,
  adminDetailBody,
  adminDetailLabel,
  adminDetailLink,
  adminEmptyText,
  adminErrorText,
  adminPageSubtitle,
  adminPageTitle,
  adminSelect,
  adminStatLabel,
  adminStatValue,
  adminStatusBadge,
  adminTableCell,
  adminTableCellMuted,
  adminTableCellStrong,
  adminTableHead,
} from "../../components/admin/adminStyles";
import { BookingsIcon, CheckCircleIcon, ClockIcon, EuroIcon, SpinnerIcon } from "../../components/admin/icons";
import { fetchOrders, updateOrderStatus } from "../../services/adminOrders";
import { formatDisplayDate } from "../../utils/bookingPricing";

const STATUSES = ["pending", "contacted", "confirmed", "cancelled"];

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/60",
  contacted: "bg-blue-50 text-blue-800 ring-1 ring-blue-200/60",
  confirmed: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/60",
  cancelled: "bg-gray-100 text-gray-600 ring-1 ring-gray-200/80",
};

function formatEuroFromCents(cents) {
  return `€ ${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function computeStats(orders) {
  const monthPrefix = new Date().toISOString().slice(0, 7);
  const pending = orders.filter((order) => order.status === "pending").length;
  const confirmed = orders.filter((order) => order.status === "confirmed").length;
  const revenueCents = orders
    .filter((order) => order.status !== "cancelled" && order.created_at.startsWith(monthPrefix))
    .reduce((sum, order) => sum + order.subtotal_cents, 0);

  return [
    { label: "Total bookings", value: String(orders.length), icon: BookingsIcon },
    { label: "Pending", value: String(pending), icon: ClockIcon },
    { label: "Confirmed", value: String(confirmed), icon: CheckCircleIcon },
    { label: "Potential Revenue", value: `€ ${(revenueCents / 100).toFixed(2)}`, icon: EuroIcon },
  ];
}

function StatusBadge({ status }) {
  return <span className={`${adminStatusBadge} ${STATUS_STYLES[status]}`}>{status}</span>;
}

function OrderRow({ order, expanded, onToggle, onStatusChange }) {
  const tourSummary = order.order_items.map((item) => item.tour_title).join(", ");

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
      >
        <td className={`${adminTableCellStrong} tabular-nums`}>{order.order_number}</td>
        <td className={adminTableCellMuted}>{formatDisplayDate(order.created_at.slice(0, 10))}</td>
        <td className={adminTableCell}>
          {order.first_name} {order.last_name}
        </td>
        <td className={`max-w-[280px] truncate ${adminTableCellMuted}`}>{tourSummary}</td>
        <td className={`${adminTableCellStrong} tabular-nums`}>
          {formatEuroFromCents(order.subtotal_cents)}
        </td>
        <td className="px-5 py-4">
          <StatusBadge status={order.status} />
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-100 bg-gray-50/80">
          <td colSpan={6} className="px-5 py-7">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <h3 className={adminDetailLabel}>Contact</h3>
                  <p className={adminDetailBody}>
                    <a href={`mailto:${order.email}`} className={adminDetailLink}>
                      {order.email}
                    </a>
                    <br />
                    <a href={`tel:${order.phone}`} className={adminDetailLink}>
                      {order.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className={adminDetailLabel}>Billing address</h3>
                  <p className={adminDetailBody}>
                    {order.address}
                    {order.apartment ? `, ${order.apartment}` : ""}
                    <br />
                    {order.city}, {order.postal_code} {order.state}
                    <br />
                    {order.country}
                    {order.company ? ` · ${order.company}` : ""}
                  </p>
                </div>
                {order.note && (
                  <div>
                    <h3 className={adminDetailLabel}>Note</h3>
                    <p className={adminDetailBody}>{order.note}</p>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className={adminDetailLabel}>Items</h3>
                  <ul className="m-0 mt-2 list-none space-y-4 p-0">
                    {order.order_items.map((item) => (
                      <li key={item.id} className={adminDetailBody}>
                        <span className="font-medium text-gray-900">{item.tour_title}</span>
                        <span className="text-gray-600"> — {item.guests} guest(s)</span>
                        <br />
                        <span className="text-[14px] text-gray-600">
                          {formatDisplayDate(item.check_in)} → {formatDisplayDate(item.check_out)}
                        </span>
                        {item.addons?.length > 0 && (
                          <span className="text-[14px] text-gray-600">
                            {" "}
                            · add-ons: {item.addons.map((addon) => `${addon.id} ×${addon.quantity}`).join(", ")}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={adminDetailLabel}>Status</h3>
                  <select
                    value={order.status}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => onStatusChange(order.id, event.target.value)}
                    className={adminSelect}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status} className="capitalize">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminBookingsPage() {
  const [orders, setOrders] = useState(null);
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
    <AdminLayout>
      <div className="mb-8">
        <h1 className={adminPageTitle}>Bookings</h1>
        <p className={adminPageSubtitle}>Every booking placed through the site, in one place.</p>
      </div>

      {orders && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {computeStats(orders).map((stat) => (
            <div key={stat.label} className={`${adminCard} p-5`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand-pale text-brand">
                <stat.icon className="h-4.5 w-4.5" />
              </div>
              <p className={adminStatValue}>{stat.value}</p>
              <p className={adminStatLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {!orders && !error && (
        <div className="flex justify-center py-20">
          <SpinnerIcon className="h-8 w-8 text-brand" />
        </div>
      )}

      {error && <p className={adminErrorText}>{error}</p>}

      {orders && orders.length === 0 && (
        <div className={`${adminCard} px-6 py-16 text-center`}>
          <p className={adminEmptyText}>No bookings yet.</p>
        </div>
      )}

      {orders && orders.length > 0 && (
        <div className={`overflow-x-auto ${adminCard}`}>
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className={adminTableHead}>Order</th>
                <th className={adminTableHead}>Date</th>
                <th className={adminTableHead}>Customer</th>
                <th className={adminTableHead}>Tour</th>
                <th className={adminTableHead}>Total</th>
                <th className={adminTableHead}>Status</th>
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
