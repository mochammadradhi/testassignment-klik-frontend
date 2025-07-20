import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/authSlice";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">CMS Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {name}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <NavigationMenu className="container mx-auto px-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/settings"
                className={navigationMenuTriggerStyle()}
              >
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CMS App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
