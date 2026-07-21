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
import { CheckCircleIcon, ClockIcon, MailIcon, SpinnerIcon } from "../../components/admin/icons";
import { fetchRequests, updateRequestStatus } from "../../services/adminRequests";
import { formatDisplayDate } from "../../utils/bookingPricing";

const STATUSES = ["new", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-amber-50 text-amber-800 ring-1 ring-amber-200/60",
  contacted: "bg-blue-50 text-blue-800 ring-1 ring-blue-200/60",
  closed: "bg-gray-100 text-gray-600 ring-1 ring-gray-200/80",
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
  return <span className={`${adminStatusBadge} ${STATUS_STYLES[status]}`}>{status}</span>;
}

function RequestRow({ request, expanded, onToggle, onStatusChange }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
      >
        <td className={adminTableCellMuted}>{formatDisplayDate(request.created_at.slice(0, 10))}</td>
        <td className={adminTableCellStrong}>{TYPE_LABELS[request.type] ?? request.type}</td>
        <td className={adminTableCell}>{request.name}</td>
        <td className={`max-w-[280px] truncate ${adminTableCellMuted}`}>
          {request.type === "tour_request" ? request.tour_title : request.subject}
        </td>
        <td className="px-5 py-4">
          <StatusBadge status={request.status} />
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-100 bg-gray-50/80">
          <td colSpan={5} className="px-5 py-7">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <h3 className={adminDetailLabel}>Contact</h3>
                  <p className={adminDetailBody}>
                    <a href={`mailto:${request.email}`} className={adminDetailLink}>
                      {request.email}
                    </a>
                    {request.phone && (
                      <>
                        <br />
                        <a href={`tel:${request.phone}`} className={adminDetailLink}>
                          {request.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>

                {request.type === "tour_request" ? (
                  <>
                    <div>
                      <h3 className={adminDetailLabel}>Tour</h3>
                      <p className={adminDetailBody}>
                        <span className="font-medium text-gray-900">{request.tour_title}</span>
                        <br />
                        <span className="text-[14px] text-gray-600">{request.preferred_departure}</span>
                      </p>
                    </div>
                    {request.addons_summary && request.addons_summary !== "None" && (
                      <div>
                        <h3 className={adminDetailLabel}>Add-ons</h3>
                        <p className={adminDetailBody}>{request.addons_summary}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <h3 className={adminDetailLabel}>Subject</h3>
                    <p className={adminDetailBody}>{request.subject}</p>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <h3 className={adminDetailLabel}>Message</h3>
                  <p className={`whitespace-pre-wrap ${adminDetailBody}`}>{request.message || "—"}</p>
                </div>

                <div>
                  <h3 className={adminDetailLabel}>Status</h3>
                  <select
                    value={request.status}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => onStatusChange(request.id, event.target.value)}
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
      <div className="mb-8">
        <h1 className={adminPageTitle}>Requests</h1>
        <p className={adminPageSubtitle}>
          Contact form messages and tour requests submitted through the site.
        </p>
      </div>

      {requests && (
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {computeStats(requests).map((stat) => (
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

      {!requests && !error && (
        <div className="flex justify-center py-20">
          <SpinnerIcon className="h-8 w-8 text-brand" />
        </div>
      )}

      {error && <p className={adminErrorText}>{error}</p>}

      {requests && requests.length === 0 && (
        <div className={`${adminCard} px-6 py-16 text-center`}>
          <p className={adminEmptyText}>No requests yet.</p>
        </div>
      )}

      {requests && requests.length > 0 && (
        <div className={`overflow-x-auto ${adminCard}`}>
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className={adminTableHead}>Date</th>
                <th className={adminTableHead}>Type</th>
                <th className={adminTableHead}>Name</th>
                <th className={adminTableHead}>Subject / Tour</th>
                <th className={adminTableHead}>Status</th>
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
