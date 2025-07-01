import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

interface ClientData extends Omit<ClientFormData, 'signature'> {
  signatureUrl?: string;
  submissionDate: string;
  clientId: string;
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
            <h3>Welcome to AhumAI family, {clientData.firstName}!</h3>
            <p>Your onboarding is complete successfully.</p>
            <div className="client-id-display">
              <strong>Your Client ID: {clientData.clientId}</strong>
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const ClientOnboarding: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ClientFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<ClientData | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // Watch form values for progressive disclosure (UX principle)
  const watchedValues = watch();
  const allFieldsFilled = watchedValues.firstName && watchedValues.lastName && 
                         watchedValues.mobileNumber && watchedValues.businessEmail && 
                         watchedValues.businessName && signaturePreview;

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

  const generateClientId = () => {
    return 'CL' + Date.now().toString(36).toUpperCase();
  };

  const saveToSessionStorage = (data: ClientData) => {
    const existingClients = JSON.parse(sessionStorage.getItem('ahumai_clients') || '[]');
    existingClients.push(data);
    sessionStorage.setItem('ahumai_clients', JSON.stringify(existingClients));
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
      pdf.save(`client-confirmation-${clientData.clientId}.pdf`);
      
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
        
        // Redirect to main website after email is sent
        setTimeout(() => {
          window.location.href = 'https://ahumai.co.in';
        }, 1000);
        
        resolve(true);
      }, 2000);
    });
  };

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);

    try {
      const clientData: ClientData = {
        ...data,
        signatureUrl: signaturePreview,
        submissionDate: new Date().toISOString(),
        clientId: generateClientId()
      };

      // Save to session storage
      saveToSessionStorage(clientData);
      
      // Set submitted data for PDF preview
      setSubmittedData(clientData);

      // Generate PDF after a short delay to allow DOM to update
      setTimeout(async () => {
        await generatePDF(clientData);
        setIsSubmitting(false);
        
        // Show success modal instead of alert
        setShowSuccessModal(true);
        
        // Reset form
        reset();
        setSignaturePreview('');
        setCurrentStep(1);
      }, 500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setSubmittedData(null);
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

  return (
    <div className="client-onboarding">
      <div className="tech-background"></div>
      <div className="onboarding-container">
        <div className="onboarding-header">
          <div className="logo-section">
            <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="header-logo" />
            <h1>Client Onboarding</h1>
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
                    placeholder="your.email@company.com"
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

          {/* Step 3: Legal Agreements and Signature */}
          {currentStep === 3 && (
            <div className="form-step active">
              <h2 className="step-title">
                <span className="step-number">03</span>
                Legal Agreements & Signature
              </h2>
              <p className="step-description">Please review and agree to our terms, then provide your signature</p>
              
              {/* Legal Documents Section - Chunking and Clear Hierarchy */}
              <div className="legal-section">
                <h3 className="section-title">Legal Documents</h3>
                <p className="section-description">
                  Please review the following documents and check the boxes to indicate your agreement:
                </p>
                
                <div className="legal-agreements">
                  <div className="legal-item">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="privacyPolicy"
                        {...register('privacyPolicy', { required: 'You must agree to the Privacy Policy' })}
                        className={errors.privacyPolicy ? 'error' : ''}
                      />
                      <label htmlFor="privacyPolicy" className="checkbox-label">
                        <span className="checkmark"></span>
                        I have read and agree to the 
                        <a href="/Privacy Policy.pdf" target="_blank" rel="noopener noreferrer" className="doc-link">
                          Privacy Policy
                        </a>
                        <span className="required">*</span>
                      </label>
                    </div>
                    {errors.privacyPolicy && <span className="error-message">{errors.privacyPolicy.message}</span>}
                  </div>

                  <div className="legal-item">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="termsConditions"
                        {...register('termsConditions', { required: 'You must agree to the Terms & Conditions' })}
                        className={errors.termsConditions ? 'error' : ''}
                      />
                      <label htmlFor="termsConditions" className="checkbox-label">
                        <span className="checkmark"></span>
                        I have read and agree to the 
                        <a href="/AhumAI- T & C..pdf" target="_blank" rel="noopener noreferrer" className="doc-link">
                          Terms & Conditions
                        </a>
                        <span className="required">*</span>
                      </label>
                    </div>
                    {errors.termsConditions && <span className="error-message">{errors.termsConditions.message}</span>}
                  </div>

                  <div className="legal-item">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="supportAddendum"
                        {...register('supportAddendum', { required: 'You must agree to the Support Addendum' })}
                        className={errors.supportAddendum ? 'error' : ''}
                      />
                      <label htmlFor="supportAddendum" className="checkbox-label">
                        <span className="checkmark"></span>
                        I have read and agree to the 
                        <a href="/Support Addendum- AhumAI.pdf" target="_blank" rel="noopener noreferrer" className="doc-link">
                          Support Addendum
                        </a>
                        <span className="required">*</span>
                      </label>
                    </div>
                    {errors.supportAddendum && <span className="error-message">{errors.supportAddendum.message}</span>}
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="signature-section">
                <h3 className="section-title">Digital Signature</h3>
                <p className="section-description">
                  Upload your signature to complete the onboarding process
                </p>
                
                <div className="form-group full-width">
                  <label htmlFor="signature" className="file-label">
                    Upload Signature <span className="required">*</span>
                  </label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="signature"
                      accept="image/*"
                      {...register('signature', { required: 'Signature is required' })}
                      onChange={handleSignatureUpload}
                      className={`file-input ${errors.signature ? 'error' : ''}`}
                    />
                    <div className="file-upload-display">
                      {signaturePreview ? (
                        <div className="signature-preview">
                          <img src={signaturePreview} alt="Signature Preview" />
                          <span className="signature-status">✓ Signature uploaded</span>
                        </div>
                      ) : (
                        <div className="file-placeholder">
                          <span className="upload-icon">📝</span>
                          <span>Click to upload your signature</span>
                          <span className="file-hint">Supported formats: JPG, PNG, GIF</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.signature && <span className="error-message">{errors.signature.message}</span>}
                </div>
              </div>

              <div className="step-navigation">
                <button type="button" className="btn-secondary" onClick={prevStep}>
                  Previous
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting || !allFieldsFilled || !watchedValues.privacyPolicy || !watchedValues.termsConditions || !watchedValues.supportAddendum}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span className="submit-icon">🚀</span>
                      Complete Onboarding
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        clientData={submittedData}
        onClose={handleModalClose}
        onEmailSend={sendEmailConfirmation}
      />

      {/* PDF Preview Template - Hidden from view but used for PDF generation */}
      {submittedData && (
        <div ref={pdfRef} className="pdf-template">
          <div className="pdf-header">
            <div className="logo-container">
              <img src="/ahumai_logo.svg" alt="AhumAI Logo" className="pdf-logo" />
              <div className="logo-text">
                <h1>AhumAI</h1>
                <p className="tagline">Create for More</p>
              </div>
            </div>
            <div className="pdf-meta">
              <p><strong>Client ID:</strong> {submittedData.clientId}</p>
              <p><strong>Date:</strong> {new Date(submittedData.submissionDate).toLocaleDateString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: '2-digit' 
              })}</p>
            </div>
          </div>

          <div className="pdf-content">
            <div className="client-details">
              <h2>Client Information</h2>
              <div className="detail-row">
                <span className="label">Full Name:</span>
                <span className="value">{submittedData.firstName} {submittedData.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Mobile Number:</span>
                <span className="value">{submittedData.mobileNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">Business Email:</span>
                <span className="value">{submittedData.businessEmail}</span>
              </div>
              <div className="detail-row">
                <span className="label">Business Name:</span>
                <span className="value">{submittedData.businessName}</span>
              </div>
            </div>

            <div className="legal-confirmations">
              <h2>Legal Agreements Confirmed</h2>
              <div className="agreement-item">✓ Privacy Policy - Agreed</div>
              <div className="agreement-item">✓ Terms & Conditions - Agreed</div>
              <div className="agreement-item">✓ Support Addendum - Agreed</div>
            </div>

            {submittedData.signatureUrl && (
              <div className="signature-section">
                <h2>Digital Signature</h2>
                <div className="signature-container">
                  <img src={submittedData.signatureUrl} alt="Client Signature" />
                  <p>Signature Date: {new Date(submittedData.submissionDate).toLocaleDateString('en-US', { 
                    month: '2-digit', 
                    day: '2-digit', 
                    year: '2-digit' 
                  })}</p>
                </div>
              </div>
            )}

            <div className="pdf-footer">
              <p>This document confirms the successful onboarding of the above client to AhumAI services.</p>
              <p>All legal agreements have been reviewed and accepted by the client.</p>
              <p>Generated on: {new Date().toLocaleString('en-US', { 
                month: '2-digit', 
                day: '2-digit', 
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <hr />
              <div className="company-info">
                <strong>AhumAI</strong><br />
                Advanced AI Solutions<br />
                www.ahumai.co.in
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOnboarding; 