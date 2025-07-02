-- ============================================================================
-- AHUMAI CLIENT ONBOARDING SYSTEM - SUPABASE SETUP
-- ============================================================================
-- This file contains all SQL queries needed to set up the client management system
-- Run these queries in your Supabase SQL Editor in order
-- ============================================================================

-- 1. ENABLE ROW LEVEL SECURITY
-- ============================================================================
-- Note: auth.users table is managed by Supabase and already has RLS enabled
-- No need to manually enable RLS on auth.users

-- 2. CREATE CLIENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id VARCHAR(20) UNIQUE NOT NULL,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    
    -- Business Information  
    business_email VARCHAR(255) NOT NULL UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    
    -- Digital Signature
    signature_url TEXT,
    
    -- Legal Compliance
    privacy_policy BOOLEAN DEFAULT FALSE,
    terms_conditions BOOLEAN DEFAULT FALSE,
    support_addendum BOOLEAN DEFAULT FALSE,
    
    -- System Fields
    submission_date TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_onboarding_complete BOOLEAN DEFAULT FALSE,
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'inactive')),
    
    CONSTRAINT clients_legal_compliance_check 
        CHECK (privacy_policy = TRUE AND terms_conditions = TRUE AND support_addendum = TRUE)
);

-- 3. CREATE CLIENT PROJECTS TABLE (for future use)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.client_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    project_description TEXT,
    project_status VARCHAR(20) DEFAULT 'planning' CHECK (project_status IN ('planning', 'in_progress', 'review', 'completed', 'on_hold')),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE CLIENT SUPPORT TICKETS TABLE (for future use)  
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 5. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_client_id ON public.clients(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_business_email ON public.clients(business_email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_client_projects_client_id ON public.client_projects(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_client_id ON public.support_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON public.support_tickets(status);

-- 6. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Clients can only see and modify their own data
CREATE POLICY "Users can view their own client data" ON public.clients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own client data" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own client data" ON public.clients
    FOR UPDATE USING (auth.uid() = user_id);

-- Admin users can see all client data (you'll need to set up admin role)
CREATE POLICY "Admins can view all client data" ON public.clients
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Client Projects RLS
CREATE POLICY "Users can view their own projects" ON public.client_projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.clients 
            WHERE clients.id = client_projects.client_id 
            AND clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own projects" ON public.client_projects
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.clients 
            WHERE clients.id = client_projects.client_id 
            AND clients.user_id = auth.uid()
        )
    );

-- Support Tickets RLS  
CREATE POLICY "Users can view their own tickets" ON public.support_tickets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.clients 
            WHERE clients.id = support_tickets.client_id 
            AND clients.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create their own tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.clients 
            WHERE clients.id = support_tickets.client_id 
            AND clients.user_id = auth.uid()
        )
    );

-- 7. ENABLE RLS ON ALL TABLES
-- ============================================================================
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- 8. CREATE FUNCTIONS FOR BUSINESS LOGIC
-- ============================================================================

-- Function to generate unique client IDs
CREATE OR REPLACE FUNCTION generate_client_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'CL' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 8));
END;
$$ LANGUAGE plpgsql;

-- Function to automatically set client_id on insert
CREATE OR REPLACE FUNCTION set_client_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.client_id IS NULL OR NEW.client_id = '' THEN
        NEW.client_id := generate_client_id();
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM public.clients WHERE client_id = NEW.client_id) LOOP
            NEW.client_id := generate_client_id();
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to check if onboarding is complete
CREATE OR REPLACE FUNCTION check_onboarding_complete()
RETURNS TRIGGER AS $$
BEGIN
    NEW.is_onboarding_complete := (
        NEW.first_name IS NOT NULL AND NEW.first_name != '' AND
        NEW.last_name IS NOT NULL AND NEW.last_name != '' AND
        NEW.mobile_number IS NOT NULL AND NEW.mobile_number != '' AND
        NEW.business_email IS NOT NULL AND NEW.business_email != '' AND
        NEW.business_name IS NOT NULL AND NEW.business_name != '' AND
        NEW.signature_url IS NOT NULL AND NEW.signature_url != '' AND
        NEW.privacy_policy = TRUE AND
        NEW.terms_conditions = TRUE AND
        NEW.support_addendum = TRUE
    );
    
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate support ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
BEGIN
    RETURN 'TK' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- 9. CREATE TRIGGERS
-- ============================================================================

-- Trigger to auto-generate client_id
CREATE TRIGGER trigger_set_client_id
    BEFORE INSERT ON public.clients
    FOR EACH ROW EXECUTE FUNCTION set_client_id();

-- Trigger to check onboarding completion
CREATE TRIGGER trigger_check_onboarding_complete
    BEFORE INSERT OR UPDATE ON public.clients
    FOR EACH ROW EXECUTE FUNCTION check_onboarding_complete();

-- Trigger to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ticket_number IS NULL OR NEW.ticket_number = '' THEN
        NEW.ticket_number := generate_ticket_number();
        -- Ensure uniqueness
        WHILE EXISTS (SELECT 1 FROM public.support_tickets WHERE ticket_number = NEW.ticket_number) LOOP
            NEW.ticket_number := generate_ticket_number();
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_ticket_number
    BEFORE INSERT ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION set_ticket_number();

-- 10. STORAGE BUCKET FOR SIGNATURES (Optional - for file uploads)
-- ============================================================================
-- Run this in the Supabase Storage section, not SQL editor:
-- 
-- 1. Create a bucket called 'client-signatures'
-- 2. Set it to public or create policies as needed
-- 3. Add RLS policies for signature uploads

-- 11. INSERT SAMPLE ADMIN USER (REPLACE WITH YOUR EMAIL)
-- ============================================================================
-- This will be automatically handled when you sign up
-- Just make sure to update your user metadata to include admin role:
-- 
-- UPDATE auth.users 
-- SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb 
-- WHERE email = 'your-admin-email@domain.com';

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- After running these queries:
-- 1. Enable Authentication in Supabase Dashboard
-- 2. Configure OAuth providers (Google, GitHub, etc.)
-- 3. Set up Storage bucket for signatures
-- 4. Update your admin user role in auth.users table
-- 5. Test the integration!
-- ============================================================================ 