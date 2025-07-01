import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

interface ClientData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  businessEmail: string;
  businessName: string;
  signatureUrl?: string;
  submissionDate: string;
  clientId: string;
}

const AdminDashboard: React.FC = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    const storedClients = localStorage.getItem('ahumai_clients');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all client data? This action cannot be undone.')) {
      localStorage.removeItem('ahumai_clients');
      setClients([]);
      setSelectedClient(null);
    }
  };

  const viewClient = (client: ClientData) => {
    setSelectedClient(client);
  };

  const closeModal = () => {
    setSelectedClient(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage client onboarding data</p>
          <div className="dashboard-actions">
            <button onClick={loadClients} className="refresh-btn">
              Refresh Data
            </button>
            <button onClick={clearAllData} className="clear-btn">
              Clear All Data
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="stats-section">
            <div className="stat-card">
              <h3>Total Clients</h3>
              <p className="stat-number">{clients.length}</p>
            </div>
            <div className="stat-card">
              <h3>Latest Submission</h3>
              <p className="stat-text">
                {clients.length > 0 
                  ? new Date(clients[clients.length - 1].submissionDate).toLocaleDateString()
                  : 'No submissions yet'
                }
              </p>
            </div>
          </div>

          <div className="clients-section">
            <h2>Client List</h2>
            {clients.length === 0 ? (
              <div className="no-data">
                <p>No client data found. Visit the <a href="/client-onboarding">Client Onboarding</a> page to add clients.</p>
              </div>
            ) : (
              <div className="clients-table">
                <table>
                  <thead>
                    <tr>
                      <th>Client ID</th>
                      <th>Name</th>
                      <th>Business</th>
                      <th>Email</th>
                      <th>Submission Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.clientId}>
                        <td>{client.clientId}</td>
                        <td>{client.firstName} {client.lastName}</td>
                        <td>{client.businessName}</td>
                        <td>{client.businessEmail}</td>
                        <td>{new Date(client.submissionDate).toLocaleDateString()}</td>
                        <td>
                          <button 
                            onClick={() => viewClient(client)}
                            className="view-btn"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Client Details</h2>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="client-detail">
                <strong>Client ID:</strong> {selectedClient.clientId}
              </div>
              <div className="client-detail">
                <strong>Full Name:</strong> {selectedClient.firstName} {selectedClient.lastName}
              </div>
              <div className="client-detail">
                <strong>Mobile Number:</strong> {selectedClient.mobileNumber}
              </div>
              <div className="client-detail">
                <strong>Business Email:</strong> {selectedClient.businessEmail}
              </div>
              <div className="client-detail">
                <strong>Business Name:</strong> {selectedClient.businessName}
              </div>
              <div className="client-detail">
                <strong>Submission Date:</strong> {new Date(selectedClient.submissionDate).toLocaleString()}
              </div>
              {selectedClient.signatureUrl && (
                <div className="client-detail">
                  <strong>Signature:</strong>
                  <div className="signature-display">
                    <img src={selectedClient.signatureUrl} alt="Client Signature" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 