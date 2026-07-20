import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { CheckCircleIcon, ClockIcon, MailIcon, SpinnerIcon } from "../../components/admin/icons";
import { fetchRequests, updateRequestStatus } from "../../services/adminRequests";
import { formatDisplayDate } from "../../utils/bookingPricing";

const STATUSES = ["new", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  closed: "bg-gray-100 text-gray-500",
};

const TYPE_LABELS = {
  contact: "Contact",
  tour_request: "Tour Request",
};

function computeStats(requests) {
  const newCount = requests.filter((r) => r.status === "new").length;
  const closedCount = requests.filter((r) => r.status === "closed").length;

  return [
    { label: "Total requests", value: String(requests.length), icon: MailIcon },
    { label: "New", value: String(newCount), icon: ClockIcon },
    { label: "Closed", value: String(closedCount), icon: CheckCircleIcon },
  ];
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-sans text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

function RequestRow({ request, expanded, onToggle, onStatusChange }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-brand-pale/40"
      >
        <td className="px-5 py-4 font-sans text-sm text-text-muted">
          {formatDisplayDate(request.created_at.slice(0, 10))}
        </td>
        <td className="px-5 py-4 font-sans text-sm font-semibold text-black">
          {TYPE_LABELS[request.type] ?? request.type}
        </td>
        <td className="px-5 py-4 font-sans text-sm text-black">{request.name}</td>
        <td className="max-w-[260px] truncate px-5 py-4 font-sans text-sm text-text-muted">
          {request.type === "tour_request" ? request.tour_title : request.subject}
        </td>
        <td className="px-5 py-4">
          <StatusBadge status={request.status} />
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-100 bg-[#f9f7f6]">
          <td colSpan={5} className="px-5 py-6">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="m-0 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Contact
                </h3>
                <p className="mt-2 font-sans text-sm text-black">
                  <a href={`mailto:${request.email}`} className="text-brand no-underline hover:underline">
                    {request.email}
                  </a>
                  {request.phone && (
                    <>
                      <br />
                      <a href={`tel:${request.phone}`} className="text-brand no-underline hover:underline">
                        {request.phone}
                      </a>
                    </>
                  )}
                </p>

                {request.type === "tour_request" ? (
                  <>
                    <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Tour
                    </h3>
                    <p className="mt-2 font-sans text-sm text-black">
                      {request.tour_title}
                      <br />
                      <span className="text-text-muted">{request.preferred_departure}</span>
                    </p>
                    {request.addons_summary && request.addons_summary !== "None" && (
                      <>
                        <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                          Add-ons
                        </h3>
                        <p className="mt-2 font-sans text-sm text-black">{request.addons_summary}</p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                      Subject
                    </h3>
                    <p className="mt-2 font-sans text-sm text-black">{request.subject}</p>
                  </>
                )}
              </div>

              <div>
                <h3 className="m-0 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Message
                </h3>
                <p className="mt-2 whitespace-pre-wrap font-sans text-sm text-black">
                  {request.message || "—"}
                </p>

                <h3 className="m-0 mt-4 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Status
                </h3>
                <select
                  value={request.status}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(event) => onStatusChange(request.id, event.target.value)}
                  className="mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2 font-sans text-sm text-black capitalize outline-none focus:border-brand"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status} className="capitalize">
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

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchRequests()
      .then((data) => {
        if (!cancelled) setRequests(data);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load requests.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleStatusChange(requestId, status) {
    const previous = requests;
    setRequests((current) => current.map((r) => (r.id === requestId ? { ...r, status } : r)));
    try {
      await updateRequestStatus(requestId, status);
    } catch {
      setRequests(previous);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="m-0 font-serif text-3xl font-semibold text-black">Requests</h1>
          <p className="mt-1 font-sans text-sm text-text-muted">
            Contact form messages and tour requests submitted through the site.
          </p>
        </div>
      </div>

      {requests && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {computeStats(requests).map((stat) => (
            <div key={stat.label} className="rounded-[16px] border border-gray-100 bg-white p-5 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.08)]">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand-pale text-brand">
                <stat.icon className="h-4.5 w-4.5" />
              </div>
              <p className="mt-3 font-sans text-2xl font-bold text-black">{stat.value}</p>
              <p className="mt-0.5 font-sans text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {!requests && !error && (
        <div className="flex justify-center py-20">
          <SpinnerIcon className="h-8 w-8 text-brand" />
        </div>
      )}

      {error && <p className="font-sans text-sm text-brand">{error}</p>}

      {requests && requests.length === 0 && (
        <div className="rounded-[16px] border border-gray-100 bg-white px-6 py-16 text-center shadow-[0_2px_16px_-8px_rgba(0,0,0,0.08)]">
          <p className="m-0 font-sans text-sm text-text-muted">No requests yet.</p>
        </div>
      )}

      {requests && requests.length > 0 && (
        <div className="overflow-x-auto rounded-[16px] border border-gray-100 bg-white shadow-[0_2px_16px_-8px_rgba(0,0,0,0.08)]">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#fafafa] text-left">
                <th className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Date
                </th>
                <th className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Type
                </th>
                <th className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Name
                </th>
                <th className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Subject / Tour
                </th>
                <th className="px-5 py-3.5 font-sans text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <RequestRow
                  key={request.id}
                  request={request}
                  expanded={expandedId === request.id}
                  onToggle={() => setExpandedId((current) => (current === request.id ? null : request.id))}
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
