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
}

interface ClientData extends Omit<ClientFormData, 'signature'> {
  signatureUrl?: string;
  submissionDate: string;
  clientId: string;
}

const ClientOnboarding: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signaturePreview, setSignaturePreview] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<ClientData | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

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

  const saveToLocalStorage = (data: ClientData) => {
    const existingClients = JSON.parse(localStorage.getItem('ahumai_clients') || '[]');
    existingClients.push(data);
    localStorage.setItem('ahumai_clients', JSON.stringify(existingClients));
  };

  const generatePDF = async (clientData: ClientData) => {
    if (!pdfRef.current) return;

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
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

  const onSubmit = async (data: ClientFormData) => {
    setIsSubmitting(true);

    try {
      const clientData: ClientData = {
        ...data,
        signatureUrl: signaturePreview,
        submissionDate: new Date().toISOString(),
        clientId: generateClientId()
      };

      // Save to local storage
      saveToLocalStorage(clientData);
      
      // Set submitted data for PDF preview
      setSubmittedData(clientData);

      // Generate PDF after a short delay to allow DOM to update
      setTimeout(async () => {
        await generatePDF(clientData);
        setIsSubmitting(false);
        
        // Reset form
        reset();
        setSignaturePreview('');
        
        alert('Client onboarding completed successfully! PDF has been generated and saved locally.');
      }, 500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="client-onboarding">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <h1>Client Onboarding</h1>
          <p>Please fill in all the required information to complete your registration</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="onboarding-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'First name is required' })}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
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
              />
              {errors.mobileNumber && <span className="error-message">{errors.mobileNumber.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="businessEmail">Business Email *</label>
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
              />
              {errors.businessEmail && <span className="error-message">{errors.businessEmail.message}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="businessName">Business Name *</label>
              <input
                type="text"
                id="businessName"
                {...register('businessName', { required: 'Business name is required' })}
                className={errors.businessName ? 'error' : ''}
              />
              {errors.businessName && <span className="error-message">{errors.businessName.message}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="signature">Upload Signature *</label>
              <input
                type="file"
                id="signature"
                accept="image/*"
                {...register('signature', { required: 'Signature is required' })}
                onChange={handleSignatureUpload}
                className={errors.signature ? 'error' : ''}
              />
              {errors.signature && <span className="error-message">{errors.signature.message}</span>}
              
              {signaturePreview && (
                <div className="signature-preview">
                  <img src={signaturePreview} alt="Signature Preview" />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Onboarding'}
          </button>
        </form>
      </div>

      {/* PDF Preview Template - Hidden from view but used for PDF generation */}
      {submittedData && (
        <div ref={pdfRef} className="pdf-template">
          <div className="pdf-header">
            <h1>AhumAI - Client Confirmation</h1>
            <div className="pdf-meta">
              <p><strong>Client ID:</strong> {submittedData.clientId}</p>
              <p><strong>Date:</strong> {new Date(submittedData.submissionDate).toLocaleDateString()}</p>
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

            {submittedData.signatureUrl && (
              <div className="signature-section">
                <h2>Digital Signature</h2>
                <div className="signature-container">
                  <img src={submittedData.signatureUrl} alt="Client Signature" />
                </div>
              </div>
            )}

            <div className="pdf-footer">
              <p>This document confirms the successful onboarding of the above client to AhumAI services.</p>
              <p>Generated on: {new Date().toLocaleString()}</p>
              <hr />
              <p className="company-info">
                <strong>AhumAI</strong><br />
                Advanced AI Solutions<br />
                www.ahumai.co.in
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOnboarding; 