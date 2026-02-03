import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}
      <aside className="hidden xl:block">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">

        {/* Top Header */}
        <Header />

        {/* Page Content */}
        <main
          className="
            flex-1
            w-full
            px-6 py-6
            max-w-7xl
            mx-auto
          "
        >
          {children}
        </main>

      </div>

      {/* 🔔 Toasts (global for admin) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}
