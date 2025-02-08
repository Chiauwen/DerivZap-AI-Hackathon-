import React, { useState } from 'react';
import { AlertTriangle, Clock, User, FileText, Shield, Calendar, Ban, X } from 'lucide-react';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import profilephoto from './roger.png';

const UserProfile = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Mock user data
  const userData = {
    id: 'ABC1234',
    photo: profilephoto,
    name: 'Roger',
    identity: 'Restaurant Owner',
    idCard: 'S1234567A',
    email: 'roger@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Trading Street, Financial District, NY 10005',
    registrationDate: '2023-01-15',
    status: 'Under Investigation'
  };

  const PhotoModal = () => (
    <Dialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">User Verification Documents</h2>
            <button 
              onClick={() => setShowPhotoModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Profile Photo</h3>
              <img 
                src={userData.photo} 
                alt="Profile" 
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Identity Card</h3>
              <img 
                src={userData.icPhoto} 
                alt="Identity Card" 
                className="w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  // Mock current incidents
  const currentIncidents = [
    {
      id: 1,
      date: '2024-02-08',
      time: '14:23:45',
      severity: 'Critical',
      activity: 'Multiple failed login attempts from suspicious IP addresses and M.A.C Address',
      details: 'Attempted login from 5 different countries within 10 minutes',
      status: 'Under Investigation'
    },
    {
      id: 2,
      date: '2024-02-08',
      time: '15:30:22',
      severity: 'Critical',
      activity: 'High Volume Transactions',
      details: 'High volume trades executed within milliseconds',
      status: 'Pending Review'
    }
  ];

  // Mock history records
  const historyRecords = [
    {
      id: 101,
      date: '2023-12-15',
      activity: 'Account temporarily frozen due to suspicious activity',
      resolution: 'Appeal Successful',
      details: 'User provided legitimate explanation for trading pattern',
      status: 'Resolved'
    },
    {
      id: 102,
      date: '2023-09-20',
      activity: 'Warning issued for multiple password reset attempts',
      resolution: 'Warning Acknowledged',
      details: 'User confirmed identity and secured account',
      status: 'Closed'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* User Information Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-start gap-8">
          <img 
            src={userData.photo} 
            alt={userData.name} 
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h1 className="text-2xl font-bold mb-4">{userData.name}</h1>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <User size={16} /> {userData.identity}
                  </p>
                  <p className="flex items-center gap-2">
                    <FileText size={16} /> ID: {userData.idCard}
                  </p>
                  <p className="flex items-center gap-2">
                    <Shield size={16} /> Status: 
                    <span className="text-red-600 font-medium">{userData.status}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p>Email: {userData.email}</p>
                <p>Phone: {userData.phone}</p>
                <p>Address: {userData.address}</p>
                <p>Registration Date: {userData.registrationDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Incidents Section */}
      <div className="bg-red-50 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-600" />
          Current Incidents
        </h2>
        <div className="space-y-4">
          {currentIncidents.map(incident => (
            <div key={incident.id} className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-medium">{incident.severity}</span>
                  <span className="text-gray-500">|</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {incident.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {incident.time}
                  </span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                  {incident.status}
                </span>
              </div>
              <p className="font-medium">{incident.activity}</p>
              <p className="text-gray-600 mt-1">{incident.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gray-50 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Activity History</h2>
        <div className="space-y-4">
          {historyRecords.map(record => (
            <div key={record.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {record.date}
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  record.resolution === 'Appeal Successful' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {record.resolution}
                </span>
              </div>
              <p className="font-medium">{record.activity}</p>
              <p className="text-gray-600 mt-1">{record.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permanent Action Section */}
      <div className="bg-red-50 rounded-lg shadow-sm p-6">
        <button 
          className="w-full bg-red-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
          onClick={() => window.confirm('Are you sure you want to permanently freeze this account?')}
        >
          <Ban size={20} />
          Freeze Account Permanently
        </button>
      </div>
    </div>
  );
};

export default UserProfile;