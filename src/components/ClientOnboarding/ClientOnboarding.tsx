import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  supabase, 
  getCurrentUser, 
  getCurrentSession,
  getClientData, 
  insertClientData, 
  updateClientData,
  signInWithGoogle,
  signInWithGitHub,
  signOut,
  ClientData
} from '../../lib/supabase';
import './ClientOnboarding.css';

interface ClientFormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  businessEmail: string;
  businessName: string;
  signature?: FileList;
  // Legal agreements - applying UX principles for clear consent
  privacyPolicy: boolean;
  termsConditions: boolean;
  supportAddendum: boolean;
}

interface SuccessModalProps {
  isOpen: boolean;
  clientData: ClientData | null;
  onClose: () => void;
  onEmailSend: (email: string) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, clientData, onClose, onEmailSend }) => {
  const [email, setEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsEmailSending(true);
      await onEmailSend(email);
      setIsEmailSending(false);
      setEmail('');
    }
  };

  if (!isOpen || !clientData) return null;

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <div className="modal-header">
          <h2>🎉 Congratulations!</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <div className="success-message">
            <h3>Welcome to AhumAI family, {clientData.first_name}!</h3>
            <p>Your onboarding is complete successfully.</p>
            <div className="client-id-display">
              <strong>Your Client ID: {clientData.client_id}</strong>
            </div>
            <p>Your confirmation document has been generated and downloaded automatically.</p>
          </div>
          
          <div className="email-section">
            <h4>📧 Email Confirmation</h4>
            <p>Enter your email address to receive a copy of your confirmation document:</p>
            <form onSubmit={handleEmailSubmit} className="email-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="email-input"
              />
              <button 
                type="submit" 
                disabled={isEmailSending}
                className="email-send-btn"
              >
                {isEmailSending ? 'Sending...' : 'Send Email'}
              </button>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientOnboarding: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<ClientFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<ClientData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [existingClientData, setExistingClientData] = useState<ClientData | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Watch form values for progressive disclosure (UX principle)
  const watchedValues = watch();
  const allFieldsFilled = watchedValues.firstName && watchedValues.lastName && 
                         watchedValues.mobileNumber && watchedValues.businessEmail && 
                         watchedValues.businessName && signaturePreview;

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const { user: currentUser, error: userError } = await getCurrentUser();
      
      if (userError || !currentUser) {
        setShowAuthModal(true);
        setIsLoading(false);
        return;
      }

      setUser(currentUser);

      // Check if user already has client data
      const { data: clientInfo, error: clientError } = await getClientData(currentUser.id);
      
      if (clientError) {
        console.error('Error loading client data:', clientError);
      } else if (clientInfo) {
        if (clientInfo.is_onboarding_complete) {
          // Redirect to dashboard if onboarding is complete
          window.location.href = '/client-dashboard';
          return;
        } else {
          // Pre-fill form with existing data
          setExistingClientData(clientInfo);
          setValue('firstName', clientInfo.first_name);
          setValue('lastName', clientInfo.last_name);
          setValue('mobileNumber', clientInfo.mobile_number);
          setValue('businessEmail', clientInfo.business_email);
          setValue('businessName', clientInfo.business_name);
          setValue('privacyPolicy', clientInfo.privacy_policy);
          setValue('termsConditions', clientInfo.terms_conditions);
          setValue('supportAddendum', clientInfo.support_addendum);
          if (clientInfo.signature_url) {
            setSignaturePreview(clientInfo.signature_url);
          }
        }
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignaturePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = async (clientData: ClientData) => {
    if (!pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF locally for demonstration
      pdf.save(`client-confirmation-${clientData.client_id}.pdf`);
      
      return pdf;
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const sendEmailConfirmation = async (email: string) => {
    // Simulate email sending - In production, this would call your email service
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email sent to: ${email}`);
        // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
        alert(`Confirmation email sent to ${email}!`);
        
        // Redirect to client dashboard after email is sent
        setTimeout(() => {
          window.location.href = '/client-dashboard';
        }, 1000);
        
        resolve(true);
      }, 2000);
    });
  };

  const onSubmit = async (data: ClientFormData) => {
    // Double-check authentication
    const { user: currentUser, error: userError } = await getCurrentUser();
    
    if (userError || !currentUser) {
      console.error('Authentication error:', userError);
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify session is active
      const { session } = await getCurrentSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Debug logging
      console.log('Current user:', currentUser);
      console.log('User ID:', currentUser.id);
      console.log('Session:', session);

      const clientDataToSave: Omit<ClientData, 'id' | 'client_id' | 'submission_date' | 'updated_at'> = {
        user_id: currentUser.id,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_number: data.mobileNumber,
        business_email: data.businessEmail,
        business_name: data.businessName,
        signature_url: signaturePreview,
        privacy_policy: data.privacyPolicy,
        terms_conditions: data.termsConditions,
        support_addendum: data.supportAddendum,
        is_onboarding_complete: true,
        status: 'pending'
      };

      let savedClientData: ClientData;

      if (existingClientData) {
        // Update existing record
        const { data: updatedData, error } = await updateClientData(existingClientData.id!, clientDataToSave);
        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        savedClientData = updatedData;
      } else {
        // Insert new record
        const { data: newData, error } = await insertClientData(clientDataToSave as ClientData);
        if (error) {
          console.error('Insert error:', error);
          // Provide more specific error messages
          if (error.code === '42501') {
            throw new Error('Permission denied. Please sign out and sign back in, then try again.');
          } else if (error.code === '23505') {
            throw new Error('A client with this email already exists.');
          }
          throw error;
        }
        savedClientData = newData;
      }

      // Set submitted data for PDF preview
      setSubmittedData(savedClientData);

      // Generate PDF after a short delay to allow DOM to update
      setTimeout(async () => {
        await generatePDF(savedClientData);
        setIsSubmitting(false);
        
        // Show success modal instead of alert
        setShowSuccessModal(true);
        
        // Reset form
        reset();
        setSignaturePreview('');
        setCurrentStep(1);
      }, 500);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      
      // Show more descriptive error messages
      const errorMessage = error.message || 'Error submitting form. Please try again.';
      alert(`CLIENT.AHUMAI.CO.IN SAYS\n${errorMessage}`);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Redirect to client dashboard
    window.location.href = '/client-dashboard';
  };

  const handleAuthLogin = async (provider: 'google' | 'github') => {
    try {
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else {
        result = await signInWithGitHub();
      }
      
      if (result.error) {
        console.error('Auth error:', result.error);
        alert('Login failed. Please try again.');
      }
      // The redirect will be handled by Supabase
    } catch (error) {
      console.error('Auth error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        console.error('Sign out error:', error);
        alert('Error signing out. Please try again.');
      } else {
        // Redirect to home page or refresh
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Error signing out. Please try again.');
    }
  };

  // Step navigation for better UX (Chunking principle)
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Progress indicator (Goal-Gradient Effect)
  const progressPercentage = (currentStep / 3) * 100;

  if (isLoading) {
    return (
      <div className="client-onboarding">
        <div className="tech-background"></div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Authentication Modal
  if (showAuthModal) {
    return (
      <div className="client-onboarding">
        <div className="tech-background"></div>
        <div className="auth-container">
          <div className="auth-modal">
            <div className="logo-section">
              <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
              <h1>Welcome to AhumAI</h1>
              <p>Please sign in to access the client onboarding form</p>
            </div>
            
            <div className="auth-buttons">
              <button 
                onClick={() => handleAuthLogin('google')} 
                className="auth-btn google-btn"
              >
                <span className="auth-icon">🔍</span>
                Continue with Google
              </button>
              
              <button 
                onClick={() => handleAuthLogin('github')} 
                className="auth-btn github-btn"
              >
                <span className="auth-icon">🐱</span>
                Continue with GitHub
              </button>
            </div>
            
            <p className="auth-note">
              Secure authentication powered by Supabase
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="client-onboarding">
      <div className="tech-background"></div>
      <div className="onboarding-container">
        <div className="onboarding-header">
          <div className="header-top">
            <div className="logo-section">
              <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
              <h1>Client Onboarding</h1>
            </div>
            <div className="user-info">
              <span>Welcome, {user?.email}</span>
              <button onClick={handleSignOut} className="sign-out-btn">Sign Out</button>
            </div>
          </div>
          <p>Join the AhumAI family in just 3 simple steps</p>
          
          {/* Progress Bar - Goal-Gradient Effect */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-steps">
              <span className={currentStep >= 1 ? 'active' : ''}>1. Personal Info</span>
              <span className={currentStep >= 2 ? 'active' : ''}>2. Business Details</span>
              <span className={currentStep >= 3 ? 'active' : ''}>3. Legal & Signature</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="onboarding-form">
          {/* Step 1: Personal Information - Chunking principle */}
          {currentStep === 1 && (
            <div className="form-step active">
              <h2 className="step-title">
                <span className="step-number">01</span>
                Personal Information
              </h2>
              <p className="step-description">Let's start with your basic information</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="mobileNumber">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    {...register('mobileNumber', { 
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[+]?[\d\s\-()]+$/,
                        message: 'Please enter a valid mobile number'
                      }
                    })}
                    className={errors.mobileNumber ? 'error' : ''}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.mobileNumber && <span className="error-message">{errors.mobileNumber.message}</span>}
                </div>
              </div>

              <div className="step-navigation">
                <button type="button" className="btn-secondary" disabled>
                  Previous
                </button>
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!watchedValues.firstName || !watchedValues.lastName || !watchedValues.mobileNumber}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="form-step active">
              <h2 className="step-title">
                <span className="step-number">02</span>
                Business Information
              </h2>
              <p className="step-description">Tell us about your business</p>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="businessEmail">
                    Business Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    {...register('businessEmail', { 
                      required: 'Business email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={errors.businessEmail ? 'error' : ''}
                    placeholder="business@company.com"
                  />
                  {errors.businessEmail && <span className="error-message">{errors.businessEmail.message}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="businessName">
                    Business Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    {...register('businessName', { required: 'Business name is required' })}
                    className={errors.businessName ? 'error' : ''}
                    placeholder="Your Company Name"
                  />
                  {errors.businessName && <span className="error-message">{errors.businessName.message}</span>}
                </div>
              </div>

              <div className="step-navigation">
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button 
                  type="button" 
                  className="btn-primary"
                  onClick={nextStep}
                  disabled={!watchedValues.businessEmail || !watchedValues.businessName}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Legal & Signature */}
          {currentStep === 3 && (
            <div className="form-step active">
              <h2 className="step-title">
                <span className="step-number">03</span>
                Legal Agreements & Signature
              </h2>
              <p className="step-description">Review agreements and provide your digital signature</p>
              
              <div className="signature-section">
                <div className="form-group">
                  <label htmlFor="signature" className="signature-label">
                    Digital Signature <span className="required">*</span>
                  </label>
                  <div className="signature-upload">
                    <input
                      type="file"
                      id="signature"
                      accept="image/*"
                      onChange={handleSignatureUpload}
                      className="signature-input"
                    />
                    <label htmlFor="signature" className="signature-upload-btn">
                      {signaturePreview ? 'Change Signature' : 'Upload Signature'}
                    </label>
                  </div>
                  
                  {signaturePreview && (
                    <div className="signature-preview">
                      <img src={signaturePreview} alt="Signature Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="legal-agreements">
                <h3>Legal Agreements</h3>
                <p className="legal-intro">Please review and agree to the following documents:</p>
                
                <div className="agreement-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      {...register('privacyPolicy', { required: 'You must agree to the Privacy Policy' })}
                    />
                    <span className="checkmark"></span>
                    I have read and agree to the{' '}
                    <a href="/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer" className="legal-link">
                      Privacy Policy
                    </a>
                  </label>
                  {errors.privacyPolicy && <span className="error-message">{errors.privacyPolicy.message}</span>}
                </div>

                <div className="agreement-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      {...register('termsConditions', { required: 'You must agree to the Terms & Conditions' })}
                    />
                    <span className="checkmark"></span>
                    I have read and agree to the{' '}
                    <a href="/AhumAI- T & C..pdf" target="_blank" rel="noopener noreferrer" className="legal-link">
                      Terms & Conditions
                    </a>
                  </label>
                  {errors.termsConditions && <span className="error-message">{errors.termsConditions.message}</span>}
                </div>

                <div className="agreement-item">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      {...register('supportAddendum', { required: 'You must agree to the Support Addendum' })}
                    />
                    <span className="checkmark"></span>
                    I have read and agree to the{' '}
                    <a href="/Support Addendum- AhumAI.pdf" target="_blank" rel="noopener noreferrer" className="legal-link">
                      Support Addendum
                    </a>
                  </label>
                  {errors.supportAddendum && <span className="error-message">{errors.supportAddendum.message}</span>}
                </div>
              </div>

              <div className="step-navigation">
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button 
                  type="submit" 
                  className="btn-primary submit-btn"
                  disabled={isSubmitting || !allFieldsFilled || !watchedValues.privacyPolicy || !watchedValues.termsConditions || !watchedValues.supportAddendum}
                >
                  {isSubmitting ? 'Submitting...' : 'Complete Onboarding'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* PDF Preview Section (Hidden) */}
        {submittedData && (
          <div ref={pdfRef} className="pdf-preview" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div className="pdf-content">
              <div className="pdf-header">
                <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="pdf-logo" />
                <div className="company-info">
                  <h1>AhumAI</h1>
                  <div className="tagline">Create for More</div>
                </div>
              </div>
              
              <div className="pdf-title">
                <h2>Client Onboarding Confirmation</h2>
              </div>
              
              <div className="client-details">
                <h3>Client Information</h3>
                <div className="detail-row">
                  <span className="label">Client ID:</span>
                  <span className="value">{submittedData.client_id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Name:</span>
                  <span className="value">{submittedData.first_name} {submittedData.last_name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Mobile:</span>
                  <span className="value">{submittedData.mobile_number}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Business Email:</span>
                  <span className="value">{submittedData.business_email}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Business Name:</span>
                  <span className="value">{submittedData.business_name}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{new Date(submittedData.submission_date!).toLocaleDateString('en-GB', { 
                    day: '2-digit',
                    month: '2-digit', 
                    year: '2-digit' 
                  })}</span>
                </div>
              </div>
              
              <div className="agreements-section">
                <h3>Legal Agreements</h3>
                <div className="agreement-confirmation">
                  <p>✓ Privacy Policy - Agreed</p>
                  <p>✓ Terms & Conditions - Agreed</p>
                  <p>✓ Support Addendum - Agreed</p>
                </div>
              </div>
              
              {signaturePreview && (
                <div className="signature-section-pdf">
                  <h3>Digital Signature</h3>
                  <div className="signature-container">
                    <img src={signaturePreview} alt="Client Signature" className="signature-image" />
                    <div className="signature-details">
                      <p>Signature Date: {new Date(submittedData.submission_date!).toLocaleDateString('en-GB', { 
                        day: '2-digit',
                        month: '2-digit', 
                        year: '2-digit' 
                      })}</p>
                      <p>Client: {submittedData.first_name} {submittedData.last_name}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pdf-footer">
                <p>Generated on: {new Date().toLocaleDateString('en-GB', { 
                  day: '2-digit',
                  month: '2-digit', 
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p>This document confirms the successful completion of client onboarding with AhumAI.</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          clientData={submittedData}
          onClose={handleModalClose}
          onEmailSend={sendEmailConfirmation}
        />
      </div>
    </div>
  );
};

export default ClientOnboarding; 