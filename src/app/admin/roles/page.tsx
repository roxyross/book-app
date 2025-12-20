"use client";

import { useSession } from "@/hooks/useSession";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Role } from "@/utils/rbac";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function RoleManagementPage() {
  const sessionQuery = useSession();
  const session = sessionQuery.data?.session || null;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load users from the server
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const result = await response.json();
        setUsers(result.users || []);
      } catch (error) {
        setMessage("Failed to load users: " + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update role');
      }

      const result = await response.json();

      // Update local state
      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));

      setMessage(result.message || `Role updated successfully for user ${userId}`);
    } catch (error) {
      setMessage("Failed to update role: " + (error as Error).message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requiredPermissions={["manage:users"]}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Role Management</h1>

        {message && (
          <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded">
            {message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Current Role</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{user.id.substring(0, 8)}...</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.name || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                      user.role === 'user' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1"
                    >
                      {Object.values(Role).map((role) => (
                        <option key={role} value={role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
}