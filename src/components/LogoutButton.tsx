"use client";

import { signOut } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="ml-4"
    >
      Logout
    </Button>
  );
}