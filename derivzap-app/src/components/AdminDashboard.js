import React, { useState } from 'react'
import { ChevronDown, LogOut, User, Settings } from 'lucide-react'
import logo from '../logo.svg'
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    id: 'ABC1234',
    warning: 'Critical',
    behavior: 'Multiple failed login attempts',
    action: 'Block',
  },
  {
    id: 'DEF5678',
    warning: 'Caution',
    behavior: 'Unusual trading pattern',
    action: 'Monitor',
  },
  {
    id: 'GHI9012',
    warning: 'Caution',
    behavior: 'High volume transactions',
    action: 'Review',
  },
  {
    id: 'JKL3456',
    warning: 'Critical',
    behavior: 'Suspicious IP changes',
    action: 'Block',
  },
  {
    id: 'MNO7890',
    warning: 'Critical',
    behavior: 'Multiple password resets',
    action: 'Investigate',
  },
]

const AdminDashboard = () => {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)
  const [actionMenuOpen, setActionMenuOpen] = useState(null)

  const handleUserClick = (userId) => {
    window.location.href = `/user/${userId}`
  }

  const AdminMenu = () => {
    const navigate = useNavigate();

    return (
      <div className="relative">
        <button
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          className="bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          Admin <ChevronDown size={16} />
        </button>

        {isAdminMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <button
                onClick={() => navigate('/trading')}
                className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
              > 
                <User size={16} className="mr-2" /> Switch to User
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ActionMenu = ({ rowId }) => (
    <div className="relative">
      <button
        onClick={() =>
          setActionMenuOpen(actionMenuOpen === rowId ? null : rowId)
        }
        className="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2"
      >
        Actions <ChevronDown size={16} />
      </button>

      {actionMenuOpen === rowId && (
        <div className="absolute right-0 top-0 mt-10 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <button
              onClick={() => alert('Block user: ' + rowId)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Block User
            </button>
            <button
              onClick={() => alert('Send warning to: ' + rowId)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Send Warning
            </button>
            <button
              onClick={() => alert('Review activity for: ' + rowId)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Review Activity
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <AdminMenu />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Customer Unusual Activity</h1>

        <div className="bg-red-50 rounded-lg overflow-visible">
          <table className="min-w-full divide-y divide-red-200">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  user ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Warning
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Unusual Behaviour
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-200">
              {mockData.map((row) => (
                <tr key={row.id} className="relative">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleUserClick(row.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {row.id}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-sm ${
                        row.warning === 'Critical'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {row.warning}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.behavior}</td>
                  <td className="px-6 py-4">
                    <ActionMenu rowId={row.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
