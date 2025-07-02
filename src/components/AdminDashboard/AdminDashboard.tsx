import React, { useState, useEffect } from 'react';
import { 
  supabase, 
  getCurrentUser, 
  getAllClients, 
  isUserAdmin, 
  signOut 
} from '../../lib/supabase';
import './AdminDashboard.css';

interface ClientData {
  id: string;
  user_id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  business_email: string;
  business_name: string;
  signature_url?: string;
  privacy_policy: boolean;
  terms_conditions: boolean;
  support_addendum: boolean;
  is_onboarding_complete: boolean;
  status: string;
  submission_date: string;
  updated_at: string;
}

const AdminDashboard: React.FC = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { user: currentUser, error: userError } = await getCurrentUser();
      
      if (userError || !currentUser) {
        window.location.href = '/client-onboarding';
        return;
      }

      setUser(currentUser);

      // Check if user is admin
      const adminStatus = await isUserAdmin();
      if (!adminStatus) {
        setError('Access denied. Admin privileges required.');
        setIsLoading(false);
        return;
      }

      setIsAdmin(true);

      // Load all client data
      const { data: clientsData, error: clientsError } = await getAllClients();
      
      if (clientsError) {
        console.error('Error loading clients:', clientsError);
        setError('Failed to load client data');
      } else {
        setClients(clientsData || []);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      setError('Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = 'https://ahumai.co.in';
  };

  const filteredClients = clients.filter(client => 
    client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.business_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.client_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = [...filteredClients].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.submission_date).getTime() - new Date(b.submission_date).getTime();
        break;
      case 'name':
        comparison = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const completedClients = clients.filter(client => client.is_onboarding_complete).length;
  const pendingClients = clients.filter(client => !client.is_onboarding_complete).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/client-onboarding'} className="btn-primary">
            Go to Client Portal
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <h2>Access Denied</h2>
          <p>You need admin privileges to access this dashboard.</p>
          <button onClick={() => window.location.href = '/client-onboarding'} className="btn-primary">
            Go to Client Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="logo-section">
              <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
              <div className="header-text">
                <h1>Admin Dashboard</h1>
                <p>Client Management System</p>
              </div>
            </div>
            <div className="header-actions">
              <span className="admin-info">Admin: {user?.email}</span>
              <button onClick={handleSignOut} className="sign-out-btn">
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{clients.length}</div>
            <div className="stat-label">Total Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedClients}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{pendingClients}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {clients.length > 0 
                ? formatDate(new Date(Math.max(...clients.map(c => new Date(c.submission_date).getTime()))).toISOString())
                : 'N/A'
              }
            </div>
            <div className="stat-label">Latest Signup</div>
          </div>
        </div>

        <div className="dashboard-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'status')}
              className="sort-select"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        <div className="clients-grid">
          {sortedClients.length === 0 ? (
            <div className="no-clients">
              <h3>No clients found</h3>
              <p>No client data matches your search criteria.</p>
            </div>
          ) : (
            sortedClients.map((client) => (
              <div
                key={client.id}
                className="client-card"
                onClick={() => setSelectedClient(client)}
              >
                <div className="client-header">
                  <h3>{client.first_name} {client.last_name}</h3>
                  <span className={`status-badge ${client.status}`}>
                    {client.status}
                  </span>
                </div>
                
                <div className="client-info">
                  <div className="info-row">
                    <span className="label">Client ID:</span>
                    <span className="value">{client.client_id}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Business:</span>
                    <span className="value">{client.business_name}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{client.business_email}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">{client.mobile_number}</span>
                  </div>
                </div>
                
                <div className="client-footer">
                  <span className="submission-date">
                    {formatDate(client.submission_date)}
                  </span>
                  <span className="completion-status">
                    {client.is_onboarding_complete ? '✅ Complete' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedClient && (
          <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
            <div className="client-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Client Details</h2>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedClient(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="client-details-grid">
                  <div className="detail-section">
                    <h3>Personal Information</h3>
                    <div className="detail-item">
                      <span className="detail-label">Client ID:</span>
                      <span>{selectedClient.client_id}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Full Name:</span>
                      <span>{selectedClient.first_name} {selectedClient.last_name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Mobile Number:</span>
                      <span>{selectedClient.mobile_number}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Business Email:</span>
                      <span>{selectedClient.business_email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Business Name:</span>
                      <span>{selectedClient.business_name}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Status & Dates</h3>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge ${selectedClient.status}`}>
                        {selectedClient.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Onboarding:</span>
                      <span>{selectedClient.is_onboarding_complete ? 'Complete' : 'Pending'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Submitted:</span>
                      <span>{formatDateTime(selectedClient.submission_date)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Last Updated:</span>
                      <span>{formatDateTime(selectedClient.updated_at)}</span>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Legal Agreements</h3>
                    <div className="detail-item">
                      <span className="detail-label">Privacy Policy:</span>
                      <span className={selectedClient.privacy_policy ? 'agreed' : 'not-agreed'}>
                        {selectedClient.privacy_policy ? '✅ Agreed' : '❌ Not Agreed'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Terms & Conditions:</span>
                      <span className={selectedClient.terms_conditions ? 'agreed' : 'not-agreed'}>
                        {selectedClient.terms_conditions ? '✅ Agreed' : '❌ Not Agreed'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Support Addendum:</span>
                      <span className={selectedClient.support_addendum ? 'agreed' : 'not-agreed'}>
                        {selectedClient.support_addendum ? '✅ Agreed' : '❌ Not Agreed'}
                      </span>
                    </div>
                  </div>

                  {selectedClient.signature_url && (
                    <div className="detail-section">
                      <h3>Digital Signature</h3>
                      <div className="signature-container">
                        <img 
                          src={selectedClient.signature_url} 
                          alt="Client Signature"
                          className="signature-image"
                        />
                        <p className="signature-date">
                          Signed on: {formatDateTime(selectedClient.submission_date)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 