import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { SpinnerIcon } from "./icons";

export default function AdminProtectedRoute({ children }) {
  const { status } = useAdminAuth();

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
        <SpinnerIcon className="h-8 w-8 text-brand" />
      </div>
    );
  }

  if (status === "anonymous") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
