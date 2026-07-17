import AdminLayout from "../../components/admin/AdminLayout";
import { BookingsIcon, DashboardIcon } from "../../components/admin/icons";

const STATS = [
  { label: "Total bookings", value: "0", icon: BookingsIcon },
  { label: "Upcoming departures", value: "0", icon: DashboardIcon },
  { label: "Active tours", value: "0", icon: BookingsIcon },
  { label: "Revenue (this month)", value: "€0", icon: DashboardIcon },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] border border-gray-200 bg-white p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-pale text-brand">
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-sans text-2xl font-bold text-black">{stat.value}</p>
            <p className="mt-1 font-sans text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[16px] border border-gray-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-pale text-brand">
          <BookingsIcon className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-serif text-xl font-semibold text-black">
          Booking management is coming soon
        </h2>
        <p className="mx-auto mt-2 max-w-md font-sans text-sm text-text-muted">
          This dashboard is wired up and ready — booking data, tour departures, and
          reporting will appear here once that module is built.
        </p>
      </div>
    </AdminLayout>
  );
}
