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
  // Legal agreements
  privacyPolicy: boolean;
  termsConditions: boolean;
  supportAddendum: boolean;
  invoiceTerms: boolean;
}

const AdminDashboard: React.FC = () => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'business'>('date');

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

  const downloadData = () => {
    const dataStr = JSON.stringify(clients, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ahumai-clients-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter and sort clients
  const filteredAndSortedClients = clients
    .filter(client => 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.clientId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'business':
          return a.businessName.localeCompare(b.businessName);
        case 'date':
        default:
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      }
    });

  // Calculate compliance rate
  const complianceRate = clients.length > 0 
    ? ((clients.filter(client => 
        client.privacyPolicy && client.termsConditions && 
        client.supportAddendum && client.invoiceTerms
      ).length / clients.length) * 100).toFixed(1)
    : '0';

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="logo-section">
            <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
            <h1>Admin Dashboard</h1>
          </div>
          <p>Manage client onboarding data with advanced insights</p>
          
          <div className="dashboard-actions">
            <button onClick={loadClients} className="refresh-btn">
              🔄 Refresh Data
            </button>
            <button onClick={downloadData} className="download-btn">
              📥 Export Data
            </button>
            <button onClick={clearAllData} className="clear-btn">
              🗑️ Clear All Data
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Enhanced Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Total Clients</h3>
                <p className="stat-number">{clients.length}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Latest Submission</h3>
                <p className="stat-text">
                  {clients.length > 0 
                    ? new Date(Math.max(...clients.map(c => new Date(c.submissionDate).getTime()))).toLocaleDateString()
                    : 'No submissions yet'
                  }
                </p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Compliance Rate</h3>
                <p className="stat-number">{complianceRate}%</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>This Month</h3>
                <p className="stat-number">
                  {clients.filter(client => {
                    const clientDate = new Date(client.submissionDate);
                    const now = new Date();
                    return clientDate.getMonth() === now.getMonth() && 
                           clientDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="controls-section">
            <div className="search-container">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, business, email, or client ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="sort-container">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'business')}
                className="sort-select"
              >
                <option value="date">Latest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="business">Business Name</option>
              </select>
            </div>
          </div>

          <div className="clients-section">
            <h2>Client List ({filteredAndSortedClients.length} clients)</h2>
            {filteredAndSortedClients.length === 0 ? (
              <div className="no-data">
                {searchTerm ? (
                  <p>No clients found matching "{searchTerm}". Try a different search term.</p>
                ) : (
                  <p>No client data found. Visit the <a href="/client-onboarding">Client Onboarding</a> page to add clients.</p>
                )}
              </div>
            ) : (
              <div className="clients-table-container">
                <table className="clients-table">
                  <thead>
                    <tr>
                      <th>Client ID</th>
                      <th>Name</th>
                      <th>Business</th>
                      <th>Email</th>
                      <th>Compliance</th>
                      <th>Submission Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedClients.map((client) => (
                      <tr key={client.clientId}>
                        <td>
                          <span className="client-id">{client.clientId}</span>
                        </td>
                        <td>
                          <div className="client-name">
                            <strong>{client.firstName} {client.lastName}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="business-name">{client.businessName}</span>
                        </td>
                        <td>
                          <a href={`mailto:${client.businessEmail}`} className="email-link">
                            {client.businessEmail}
                          </a>
                        </td>
                        <td>
                          <div className="compliance-status">
                            {client.privacyPolicy && client.termsConditions && 
                             client.supportAddendum && client.invoiceTerms ? (
                              <span className="status-complete">✅ Complete</span>
                            ) : (
                              <span className="status-incomplete">⚠️ Incomplete</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="submission-date">
                            {new Date(client.submissionDate).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => viewClient(client)}
                            className="view-btn"
                          >
                            👁️ View Details
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

      {/* Enhanced Client Details Modal */}
      {selectedClient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h2>Client Details</h2>
                <span className="client-id-badge">{selectedClient.clientId}</span>
              </div>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-sections">
                {/* Personal Information */}
                <div className="detail-section">
                  <h3 className="section-header">
                    <span className="section-icon">👤</span>
                    Personal Information
                  </h3>
                  <div className="detail-grid">
                    <div className="client-detail">
                      <strong>Full Name:</strong>
                      <span>{selectedClient.firstName} {selectedClient.lastName}</span>
                    </div>
                    <div className="client-detail">
                      <strong>Mobile Number:</strong>
                      <span>{selectedClient.mobileNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                <div className="detail-section">
                  <h3 className="section-header">
                    <span className="section-icon">🏢</span>
                    Business Information
                  </h3>
                  <div className="detail-grid">
                    <div className="client-detail">
                      <strong>Business Name:</strong>
                      <span>{selectedClient.businessName}</span>
                    </div>
                    <div className="client-detail">
                      <strong>Business Email:</strong>
                      <span>
                        <a href={`mailto:${selectedClient.businessEmail}`} className="email-link">
                          {selectedClient.businessEmail}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legal Compliance */}
                <div className="detail-section">
                  <h3 className="section-header">
                    <span className="section-icon">📋</span>
                    Legal Compliance
                  </h3>
                  <div className="compliance-grid">
                    <div className={`compliance-item ${selectedClient.privacyPolicy ? 'agreed' : 'not-agreed'}`}>
                      <span className="compliance-icon">
                        {selectedClient.privacyPolicy ? '✅' : '❌'}
                      </span>
                      <span>Privacy Policy</span>
                      {selectedClient.privacyPolicy && <span className="agreed-label">Agreed</span>}
                    </div>
                    
                    <div className={`compliance-item ${selectedClient.termsConditions ? 'agreed' : 'not-agreed'}`}>
                      <span className="compliance-icon">
                        {selectedClient.termsConditions ? '✅' : '❌'}
                      </span>
                      <span>Terms & Conditions</span>
                      {selectedClient.termsConditions && <span className="agreed-label">Agreed</span>}
                    </div>
                    
                    <div className={`compliance-item ${selectedClient.supportAddendum ? 'agreed' : 'not-agreed'}`}>
                      <span className="compliance-icon">
                        {selectedClient.supportAddendum ? '✅' : '❌'}
                      </span>
                      <span>Support Addendum</span>
                      {selectedClient.supportAddendum && <span className="agreed-label">Agreed</span>}
                    </div>
                    
                    <div className={`compliance-item ${selectedClient.invoiceTerms ? 'agreed' : 'not-agreed'}`}>
                      <span className="compliance-icon">
                        {selectedClient.invoiceTerms ? '✅' : '❌'}
                      </span>
                      <span>Invoice Terms</span>
                      {selectedClient.invoiceTerms && <span className="agreed-label">Agreed</span>}
                    </div>
                  </div>
                </div>

                {/* Digital Signature */}
                {selectedClient.signatureUrl && (
                  <div className="detail-section">
                    <h3 className="section-header">
                      <span className="section-icon">✍️</span>
                      Digital Signature
                    </h3>
                    <div className="signature-display">
                      <img src={selectedClient.signatureUrl} alt="Client Signature" />
                      <p className="signature-date">
                        Signed on: {new Date(selectedClient.submissionDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Submission Details */}
                <div className="detail-section">
                  <h3 className="section-header">
                    <span className="section-icon">📅</span>
                    Submission Details
                  </h3>
                  <div className="detail-grid">
                    <div className="client-detail">
                      <strong>Submission Date:</strong>
                      <span>{new Date(selectedClient.submissionDate).toLocaleString()}</span>
                    </div>
                    <div className="client-detail">
                      <strong>Client ID:</strong>
                      <span className="client-id-inline">{selectedClient.clientId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 