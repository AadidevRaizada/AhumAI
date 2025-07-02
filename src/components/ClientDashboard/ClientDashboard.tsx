import React, { useState, useEffect } from 'react';
import { supabase, getCurrentUser, getClientData, signOut, ClientData } from '../../lib/supabase';
import './ClientDashboard.css';

const ClientDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

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

      // Load client data
      const { data: clientInfo, error: clientError } = await getClientData(currentUser.id);
      
      if (clientError) {
        console.error('Error loading client data:', clientError);
        setError('Failed to load client data');
      } else if (!clientInfo) {
        // No client data found, redirect to onboarding
        window.location.href = '/client-onboarding';
        return;
      } else if (!clientInfo.is_onboarding_complete) {
        // Onboarding not complete, redirect to onboarding
        window.location.href = '/client-onboarding';
        return;
      } else {
        setClientData(clientInfo);
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

  const downloadPDF = () => {
    // In a real implementation, you would generate or fetch the PDF from storage
    alert('PDF download feature will be implemented with proper backend integration');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="client-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-dashboard">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/client-onboarding'} className="btn-primary">
            Go to Onboarding
          </button>
        </div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="client-dashboard">
        <div className="error-container">
          <h2>No Data Found</h2>
          <p>Please complete your onboarding first.</p>
          <button onClick={() => window.location.href = '/client-onboarding'} className="btn-primary">
            Complete Onboarding
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="client-dashboard">
      <div className="tech-background"></div>
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="logo-section">
              <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
              <div className="header-text">
                <h1>Client Dashboard</h1>
                <p>Welcome back, {clientData.first_name}!</p>
              </div>
            </div>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-section">
            <div className="welcome-card">
              <h2>🎉 Welcome to AhumAI Family!</h2>
              <p>Your onboarding is complete. Here's your client information:</p>
              <div className="client-id-display">
                <strong>Client ID: {clientData.client_id}</strong>
              </div>
              <div className="status-badge">
                <span className={`status ${clientData.status}`}>
                  Status: {clientData.status?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>📋 Personal Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{clientData.first_name} {clientData.last_name}</span>
                </div>
                <div className="info-item">
                  <label>Mobile:</label>
                  <span>{clientData.mobile_number}</span>
                </div>
                <div className="info-item">
                  <label>Business Email:</label>
                  <span>{clientData.business_email}</span>
                </div>
                <div className="info-item">
                  <label>Business Name:</label>
                  <span>{clientData.business_name}</span>
                </div>
                <div className="info-item">
                  <label>Joined:</label>
                  <span>{formatDate(clientData.submission_date!)}</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>📄 Documents & Actions</h3>
              <div className="actions-list">
                <button onClick={downloadPDF} className="action-btn">
                  <span className="action-icon">📥</span>
                  Download Confirmation PDF
                </button>
                <button onClick={() => window.location.href = '/client-onboarding'} className="action-btn">
                  <span className="action-icon">✏️</span>
                  Edit Profile Information
                </button>
                <button className="action-btn" disabled>
                  <span className="action-icon">📊</span>
                  View Projects (Coming Soon)
                </button>
                <button className="action-btn" disabled>
                  <span className="action-icon">🎫</span>
                  Support Tickets (Coming Soon)
                </button>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>🔒 Legal Compliance</h3>
              <div className="compliance-list">
                <div className="compliance-item">
                  <span className="check-icon">✅</span>
                  Privacy Policy Agreed
                </div>
                <div className="compliance-item">
                  <span className="check-icon">✅</span>
                  Terms & Conditions Agreed
                </div>
                <div className="compliance-item">
                  <span className="check-icon">✅</span>
                  Support Addendum Agreed
                </div>
                <div className="compliance-item">
                  <span className="check-icon">✅</span>
                  Digital Signature Provided
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>🚀 What's Next?</h3>
              <div className="next-steps">
                <p>Thank you for joining AhumAI! Here's what you can expect:</p>
                <ul>
                  <li>📧 You'll receive project updates via email</li>
                  <li>📱 Access to project management tools (coming soon)</li>
                  <li>💬 Direct communication with our team</li>
                  <li>📈 Regular progress reports on your projects</li>
                </ul>
                <div className="contact-info">
                  <p><strong>Need help?</strong> Contact us at:</p>
                  <p>📧 support@ahumai.co.in</p>
                  <p>📞 +91 XXX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="dashboard-footer">
          <p>&copy; 2024 AhumAI. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://ahumai.co.in" target="_blank" rel="noopener noreferrer">
              Visit Main Website
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="/support" target="_blank" rel="noopener noreferrer">
              Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClientDashboard; 