# AhumAI Client Management System - Database Schema

## Project Overview
**Project:** AhumAI Website Client Onboarding System  
**Database:** Supabase PostgreSQL  
**Location:** India (DD/MM/YY date format)  
**Domain:** client.ahumai.co.in (subdomain for client portal)  

---

## Supabase Configuration
- **URL:** https://lozvgagfinnzuwvxdlxo.supabase.co
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (stored in src/lib/supabase.ts)
- **Authentication:** OAuth (Google, GitHub) + Email/Password
- **Storage:** Signature uploads in 'client-signatures' bucket

---

## Core Tables

### 1. `public.clients` (Main client data)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique record ID |
| `user_id` | UUID | FOREIGN KEY auth.users(id) ON DELETE CASCADE | Links to authenticated user |
| `client_id` | VARCHAR(20) | UNIQUE NOT NULL | Human-readable client ID (e.g., CL8A9B2C3D) |
| `first_name` | VARCHAR(100) | NOT NULL | Client's first name |
| `last_name` | VARCHAR(100) | NOT NULL | Client's last name |
| `mobile_number` | VARCHAR(20) | NOT NULL | Client's mobile number |
| `business_email` | VARCHAR(255) | NOT NULL UNIQUE | Business email address |
| `business_name` | VARCHAR(255) | NOT NULL | Business/company name |
| `signature_url` | TEXT | NULLABLE | URL to uploaded signature image |
| `privacy_policy` | BOOLEAN | DEFAULT FALSE | Privacy policy agreement |
| `terms_conditions` | BOOLEAN | DEFAULT FALSE | Terms & conditions agreement |
| `support_addendum` | BOOLEAN | DEFAULT FALSE | Support addendum agreement |
| `submission_date` | TIMESTAMPTZ | DEFAULT NOW() | Form submission timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |
| `is_onboarding_complete` | BOOLEAN | DEFAULT FALSE | Auto-calculated completion status |
| `status` | VARCHAR(20) | DEFAULT 'pending', CHECK status IN (...) | Client approval status |

**Constraints:**
- `clients_legal_compliance_check`: Ensures all legal agreements are TRUE

### 2. `public.client_projects` (Future project management)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique project ID |
| `client_id` | UUID | FOREIGN KEY clients(id) ON DELETE CASCADE | Links to client |
| `project_name` | VARCHAR(255) | NOT NULL | Project name |
| `project_description` | TEXT | NULLABLE | Project description |
| `project_status` | VARCHAR(20) | CHECK project_status IN (...) | Project status |
| `start_date` | DATE | NULLABLE | Project start date |
| `end_date` | DATE | NULLABLE | Project end date |
| `budget` | DECIMAL(12,2) | NULLABLE | Project budget |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Update timestamp |

### 3. `public.support_tickets` (Future support system)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique ticket ID |
| `client_id` | UUID | FOREIGN KEY clients(id) ON DELETE CASCADE | Links to client |
| `ticket_number` | VARCHAR(20) | UNIQUE NOT NULL | Human-readable ticket number |
| `subject` | VARCHAR(255) | NOT NULL | Ticket subject |
| `description` | TEXT | NOT NULL | Ticket description |
| `priority` | VARCHAR(10) | CHECK priority IN (...) | Ticket priority |
| `status` | VARCHAR(20) | CHECK status IN (...) | Ticket status |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Update timestamp |
| `resolved_at` | TIMESTAMPTZ | NULLABLE | Resolution timestamp |

---

## Indexes (Performance Optimization)
```sql
-- Client table indexes
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_clients_client_id ON public.clients(client_id);
CREATE INDEX idx_clients_business_email ON public.clients(business_email);
CREATE INDEX idx_clients_status ON public.clients(status);

-- Project table indexes
CREATE INDEX idx_client_projects_client_id ON public.client_projects(client_id);

-- Support ticket indexes
CREATE INDEX idx_support_tickets_client_id ON public.support_tickets(client_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
```

---

## Row Level Security (RLS) Policies

### Client Data Protection
```sql
-- Users can only access their own data
CREATE POLICY "Users can view their own client data" ON public.clients
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own client data" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own client data" ON public.clients
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can access all data
CREATE POLICY "Admins can view all client data" ON public.clients
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );
```

### Project & Ticket Protection
- Similar RLS policies applied to `client_projects` and `support_tickets`
- Users can only access data linked to their client record
- Admins have full access

---

## Database Functions

### 1. Client ID Generation
```sql
CREATE OR REPLACE FUNCTION generate_client_id() RETURNS TEXT
-- Generates unique client IDs like 'CL8A9B2C3D'
```

### 2. Onboarding Completion Check
```sql
CREATE OR REPLACE FUNCTION check_onboarding_complete() RETURNS TRIGGER
-- Auto-calculates is_onboarding_complete based on required fields
```

### 3. Ticket Number Generation
```sql
CREATE OR REPLACE FUNCTION generate_ticket_number() RETURNS TEXT
-- Generates ticket numbers like 'TK202412313456'
```

---

## Authentication Flow

### OAuth Providers
1. **Google OAuth** - Primary recommendation
2. **GitHub OAuth** - Developer-friendly option
3. **Email/Password** - Fallback option

### User Roles
- **client** (default) - Can access own data only
- **admin** - Can access all data via admin dashboard
- Admin role set via: `user.raw_user_meta_data.role = 'admin'`

### Protected Routes
- `/client-onboarding` - Requires authentication
- `/client-dashboard` - Requires authentication + completed onboarding
- `/admin` - Requires admin role

---

## Storage Configuration

### Signature Uploads
- **Bucket:** `client-signatures`
- **Path Pattern:** `signatures/{user_id}-{timestamp}.{ext}`
- **RLS:** Users can upload to their own folder only
- **File Types:** JPG, PNG, GIF
- **Max Size:** 5MB (recommended)

---

## Date Format Standards
**Location:** India  
**Format:** DD/MM/YY everywhere  
**Locale:** `en-GB` for proper DD/MM/YY formatting  

```javascript
// Example usage
new Date().toLocaleDateString('en-GB', { 
  day: '2-digit',
  month: '2-digit', 
  year: '2-digit' 
})
// Output: "31/12/24"
```

---

## Client Dashboard Features (Post-Onboarding)

### Accessible After Form Completion
- ✅ View client profile & ID
- ✅ Download PDF confirmation
- ✅ Edit profile information
- 🔄 View project status (future)
- 🔄 Create support tickets (future)
- 🔄 View invoices (future)

### Dashboard Access Logic
```sql
WHERE is_onboarding_complete = TRUE 
AND status = 'approved'
AND auth.uid() = user_id
```

---

## API Endpoints (via Supabase)

### Client Data Operations
```javascript
// Get client data
supabase.from('clients').select('*').eq('user_id', userId)

// Insert client data  
supabase.from('clients').insert(clientData)

// Update client data
supabase.from('clients').update(updates).eq('id', clientId)

// Admin: Get all clients
supabase.from('clients').select('*').order('submission_date', { ascending: false })
```

### Authentication Operations
```javascript
// OAuth login
supabase.auth.signInWithOAuth({ provider: 'google' })

// Check user session
supabase.auth.getSession()

// Sign out
supabase.auth.signOut()
```

---

## Migration Notes

### From SessionStorage to Supabase
1. **Phase 1:** Keep sessionStorage as backup
2. **Phase 2:** Dual-write to both systems  
3. **Phase 3:** Full migration to Supabase
4. **Phase 4:** Remove sessionStorage code

### Data Migration Script
```javascript
// Convert existing sessionStorage data to Supabase format
const migrateSessionData = async () => {
  const existingData = JSON.parse(sessionStorage.getItem('clients') || '[]')
  // Transform and insert into Supabase
}
```

---

## Security Considerations

### Data Protection
- ✅ RLS enabled on all tables
- ✅ User isolation via auth.uid() checks
- ✅ Admin role verification
- ✅ Signature file access control

### GDPR Compliance
- ✅ User data deletion via CASCADE
- ✅ Data export capabilities
- ✅ Consent tracking (legal agreements)
- ✅ Right to be forgotten support

---

## Performance Optimizations

### Database Level
- ✅ Strategic indexes on frequently queried columns
- ✅ Efficient RLS policies
- ✅ Connection pooling via Supabase

### Application Level
- ✅ Client-side caching of user session
- ✅ Optimistic updates for better UX
- ✅ Lazy loading of non-critical data

---

## Backup & Recovery

### Automatic Backups
- **Supabase:** Automatic daily backups
- **Retention:** 7 days (free tier)
- **Point-in-time:** Available for paid plans

### Manual Exports
```sql
-- Export all client data
COPY (SELECT * FROM public.clients) TO '/path/clients_backup.csv' WITH CSV HEADER;
```

---

## Monitoring & Analytics

### Key Metrics to Track
- New client registrations per day
- Onboarding completion rates
- Average time to complete onboarding
- OAuth provider success rates
- Dashboard engagement metrics

### Supabase Dashboard Monitoring
- Database connections
- API request volumes
- Authentication success rates
- Storage usage

---

## Future Enhancements

### Phase 2 Features
- 📧 Automated email confirmations
- 📊 Client analytics dashboard  
- 💳 Payment integration
- 📱 Mobile app support

### Phase 3 Features  
- 🤖 AI-powered client insights
- 🔗 Third-party integrations
- 📈 Advanced reporting
- 🌐 Multi-language support

---

## Development Environment

### Local Setup
```bash
# Install dependencies
npm install @supabase/supabase-js

# Environment variables (.env.local)
VITE_SUPABASE_URL=https://lozvgagfinnzuwvxdlxo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Run development server
npm run dev
```

### Testing Strategy
- Unit tests for Supabase functions
- Integration tests for authentication flow
- End-to-end tests for complete onboarding
- Load testing for performance validation

---

## Support & Documentation

### Internal Documentation
- This schema document
- API reference in `src/lib/supabase.ts`
- Component documentation in respective files

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [OAuth Configuration](https://supabase.com/docs/guides/auth/social-login)

---

**Last Updated:** December 2024  
**Schema Version:** 1.0  
**Maintainer:** AhumAI Development Team 