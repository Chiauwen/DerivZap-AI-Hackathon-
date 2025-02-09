import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, User, FileText, Shield, Calendar, Ban, X, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import profilephoto from '../assets/image.png';

const UserProfile2 = () => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  // Mock user data
  const userData = {
    id: 'DEF5678',
    photo: profilephoto,
    name: 'John Steve',
    identity: 'Chef',
    idCard: 'S1234567B',
    email: 'john@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Trading Street, Financial District, NY 10005',
    registrationDate: '2024-02-09',
    status: 'Caution'
  };

  const handleAction = (incidentId, action) => {
    alert(`${action} for incident ${incidentId}`);
    setActionMenuOpen(null);
  };

  const ActionMenu = ({ incidentId }) => (
    <div className="relative">
      <button
        onClick={() => setActionMenuOpen(actionMenuOpen === incidentId ? null : incidentId)}
        className="px-3 py-1 bg-gray-100 rounded-md flex items-center gap-2 text-sm hover:bg-gray-200"
      >
        Take Action <ChevronDown size={14} />
      </button>
      
      {actionMenuOpen === incidentId && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <button 
              onClick={() => handleAction(incidentId, 'Block Account')} 
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Block Account
            </button>
            <button 
              onClick={() => handleAction(incidentId, 'Request Documentation')} 
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Request Documentation
            </button>
            <button 
              onClick={() => handleAction(incidentId, 'Issue Warning')} 
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Issue Warning
            </button>
            <button 
              onClick={() => handleAction(incidentId, 'Mark as Resolved')} 
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
  const [entryTime, setEntryTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour12: false });
    setEntryTime(formattedTime);
  }, []); 
  // Mock current incidents
  const currentIncidents = [
    {
      id: 1,
      date: '2024-02-09',
      time: entryTime,
      severity: 'Caution',
      activity: 'Unusual Account Activity',
      details: 'New user with zero trading experiences able to complete trading in short period of time',
      status: 'Under Observation'
    },
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
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {incident.status}
                  </span>
                  <ActionMenu incidentId={incident.id} />
                </div>
              </div>
              <p className="font-medium">{incident.activity}</p>
              <p className="text-gray-600 mt-1">{incident.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile2;