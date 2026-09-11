import {
  CreditCard,
  FileText,
  LayoutDashboard,
  WalletCards,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const navigationItems = [
    {
      name: "Overview",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Subscription Plans",
      path: "/plans",
      icon: CreditCard,
    },
    {
      name: "Payment Methods",
      path: "/payments",
      icon: WalletCards,
    },
    {
      name: "Invoices",
      path: "/invoices",
      icon: FileText,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/50
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-64
          border-r
          border-gray-200
          bg-white
          dark:border-gray-800
          dark:bg-gray-900
          transition-transform duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div
          className="
            flex h-16
            items-center justify-between
            border-b border-gray-200
            px-5
            dark:border-gray-800
          "
        >
          <h1 className="text-xl font-bold">
            Bill
            <span className="text-indigo-600">
              Flow
            </span>
          </h1>

          <button
            onClick={onClose}
            className="
              rounded-lg p-2
              text-gray-600
              hover:bg-gray-100
              dark:text-gray-300
              dark:hover:bg-gray-800
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-xl
                  px-4 py-3
                  text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? `
                        bg-indigo-50
                        text-indigo-600
                        dark:bg-indigo-950
                        dark:text-indigo-400
                      `
                      : `
                        text-gray-600
                        hover:bg-gray-100
                        hover:text-gray-900
                        dark:text-gray-300
                        dark:hover:bg-gray-800
                        dark:hover:text-white
                      `
                  }
                `
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div
          className="
            absolute bottom-0 left-0 right-0
            border-t border-gray-200
            p-4
            dark:border-gray-800
          "
        >
          <div className="
            rounded-xl
            bg-gray-50
            p-4
            dark:bg-gray-800
          ">
            <p className="text-sm font-medium">
              Billing Support
            </p>

            <p className="
              mt-1 text-xs
              text-gray-500
              dark:text-gray-400
            ">
              Need help with billing?
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;