import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Outlet />
      {/* <div className="bg-white fixed inset-0 -z-10 h-full w-full" /> */}
    </>
  );
}
