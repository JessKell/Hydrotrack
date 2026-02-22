import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="bg-white min-h-screen">
      <Outlet />
    </div>
  );
}
