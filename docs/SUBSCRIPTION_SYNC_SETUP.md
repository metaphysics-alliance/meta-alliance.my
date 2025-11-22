# Subscription Sync Infrastructure Setup

## Overview
This document describes the subscription synchronization system between the MVP website and the Master Meta Alliance system.

## Database Tables Created

### 1. `account_sync`
Tracks user account relationships between MVP and Master systems.

**Key Fields:**
- `mvp_user_id`: UUID reference to MVP auth.users
- `master_user_id`: UUID for linked Master account
- `sync_status`: 'pending' | 'synced' | 'failed' | 'diverged'
- `magic_link_token`: Secure token for account linking
- `last_sync_at`: Timestamp of last successful sync

**Purpose:** Maintains the link between user accounts across systems and tracks sync health.

### 2. `subscription_sync_log`
Audit trail for all subscription sync operations.

**Key Fields:**
- `operation`: 'create' | 'update' | 'cancel' | 'reactivate' | 'sync'
- `source`: 'mvp' | 'master'
- `status`: 'success' | 'failed' | 'pending'
- `mvp_data`: JSONB snapshot of MVP subscription state
- `master_data`: JSONB snapshot of Master subscription state

**Purpose:** Complete audit trail for compliance and debugging.

### 3. `service_plan_mapping`
Maps MVP service plans to Master subscription tiers.

**Key Fields:**
- `mvp_service_name`: Service identifier in MVP (e.g., 'bazi-consultation')
- `mvp_plan_code`: Plan code in MVP (e.g., 'BASIC', 'PREMIUM')
- `master_service_id`: Corresponding service ID in Master system
- `master_plan_tier`: Corresponding tier in Master system
- `features`: JSONB array of included features

**Purpose:** Ensures consistent service mapping across systems.

## Edge Functions

### `sync-subscription`
Located: `supabase/functions/sync-subscription/index.ts`

**Endpoint:** `POST /sync-subscription`

**Request Body:**
```json
{
  "mvpUserId": "uuid",
  "masterUserId": "uuid",
  "operation": "create|update|cancel|reactivate",
  "subscriptionData": {
    "serviceName": "string",
    "planCode": "string",
    "status": "string",
    "startDate": "ISO8601",
    "endDate": "ISO8601",
    "metadata": {}
  }
}
```

**Response:**
```json
{
  "success": boolean,
  "syncId": "uuid",
  "message": "string"
}
```

**Workflow:**
1. Get/create account_sync record
2. Lookup service_plan_mapping
3. Call Master system API (placeholder)
4. Update sync status
5. Log operation to subscription_sync_log

## Helper Functions

### `generate_magic_link_token(p_mvp_user_id UUID, p_validity_hours INTEGER)`
Creates a secure token for account linking with configurable expiry (default 24 hours).

### `validate_magic_link_token(p_token TEXT, p_master_user_id UUID, p_master_email TEXT)`
Validates and consumes magic link token, linking MVP account to Master account.

## Views

### `sync_health_dashboard`
Real-time health monitoring view showing:
- Account counts by sync_status
- Recently synced accounts (last 24 hours)
- Error counts
- Average time since last sync

## NPM Scripts

### Setup & Initialization
```bash
npm run sync:init          # Initialize service plan mappings
```

### Monitoring
```bash
npm run sync:monitor       # View sync health dashboard
```

## Usage Example

### 1. Apply Database Migration
```sql
-- In Supabase SQL Editor, run:
\i supabase/sql/subscription_sync_infrastructure.sql
```

### 2. Initialize Service Mappings
```bash
npm run sync:init
```

### 3. Monitor Sync Health
```bash
npm run sync:monitor
```

### 4. Sync Subscription (API Call)
```javascript
const response = await fetch('/sync-subscription', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${supabaseToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    mvpUserId: 'user-uuid',
    operation: 'create',
    subscriptionData: {
      serviceName: 'bazi-consultation',
      planCode: 'BASIC',
      status: 'active',
      startDate: new Date().toISOString()
    }
  })
})
```

## Environment Variables Required

Add to `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Security Considerations

1. **RLS Policies**: Users can only view their own sync records
2. **Service Role**: Admin operations require service_role JWT
3. **Magic Links**: Tokens are cryptographically secure, expire after use
4. **Audit Trail**: All operations logged for compliance

## Next Steps

1. ✅ Create database tables (SQL migration)
2. ✅ Create Edge Function
3. ✅ Create monitoring scripts
4. ⏳ Apply migration to Supabase
5. ⏳ Deploy Edge Function
6. ⏳ Integrate Master system API endpoint (replace placeholder)
7. ⏳ Build frontend UI for subscription management

## Master System Integration

Currently using placeholder function. Replace `syncToMasterSystem()` in Edge Function with actual Master API:

```typescript
const response = await fetch(process.env.MASTER_API_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.MASTER_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: masterUserId,
    serviceId: serviceId,
    planTier: planTier,
    operation: operation,
    ...subscriptionData
  })
})
```

## Troubleshooting

### Check Sync Status
```bash
npm run sync:monitor
```

### View Failed Syncs
```sql
SELECT * FROM account_sync WHERE sync_status = 'failed';
```

### View Sync Logs
```sql
SELECT * FROM subscription_sync_log 
WHERE status = 'failed' 
ORDER BY created_at DESC 
LIMIT 10;
```

### Retry Failed Sync
Call the Edge Function again with the same parameters - it's idempotent.
