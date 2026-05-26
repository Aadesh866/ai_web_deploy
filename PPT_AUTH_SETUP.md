# PPT Page Authentication Setup Guide

## Overview
The PPT page now has **two-layer security**:
1. **Page Access Authentication** - Username + Password required to VIEW the page
2. **Edit Authentication** - Password required to EDIT the presentation URL

## Database Setup

You need to add two new columns to your `ppt_config` table in Supabase:

### SQL Migration

```sql
-- Add access credentials columns to ppt_config table
ALTER TABLE ppt_config 
ADD COLUMN IF NOT EXISTS access_username TEXT DEFAULT 'purplehub',
ADD COLUMN IF NOT EXISTS access_password TEXT DEFAULT 'Purple@2026';
```

Run this in your Supabase SQL Editor.

## Default Credentials

### Page Access (Layer 1)
- **Username**: `purplehub`
- **Password**: `Purple@2026`

### Edit Access (Layer 2)
- **Password**: `Purplehub@123` (or value from `PPT_EDIT_PASSWORD` env var)

## How to Change Access Credentials

### Method 1: Using the Admin Panel (Recommended)
1. Login to the PPT page with current credentials
2. Click the **Settings** icon (⚙️) in the top bar
3. Enter the **Admin Password** (this is the Edit Password: `Purplehub@123`)
4. Enter the new username and password
5. Click "Update Credentials"
6. Done! Users will now need the new credentials to access the page

### Method 2: Direct Database Update
1. Go to Supabase Dashboard → Table Editor
2. Open the `ppt_config` table
3. Find the row where `id = 'main'`
4. Edit the `access_username` and `access_password` columns
5. Save changes

## Features

### Page Access Authentication
- ✅ Login screen before viewing presentation
- ✅ Session cookie (24-hour expiration)
- ✅ Logout button in top bar
- ✅ Credentials stored in Supabase (changeable)

### Edit Authentication (Existing)
- ✅ Password-protected edit modal
- ✅ Upload files or paste URLs
- ✅ Supports Canva, Google Slides, OneDrive, PDF

### Admin Panel
- ✅ Change access credentials on-the-fly
- ✅ Protected by edit password
- ✅ No need to access database directly

## Security Notes

1. **Session Duration**: Auth cookie expires after 24 hours
2. **Admin Password**: The edit password (`PPT_EDIT_PASSWORD`) acts as the admin password for changing access credentials
3. **HTTPS Required**: In production, cookies are secure and require HTTPS
4. **Path-Scoped**: Auth cookie only works for `/ppt` path

## Environment Variables

Make sure these are set in your `.env.local` or Vercel environment:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PPT_EDIT_PASSWORD=Purplehub@123  # Optional, defaults to this value
```

## Testing

1. Visit `/ppt` page
2. You should see the login screen
3. Enter default credentials:
   - Username: `purplehub`
   - Password: `Purple@2026`
4. After login, you should see the presentation viewer
5. Test the Settings button to change credentials
6. Test logout and re-login with new credentials

## Troubleshooting

### "Invalid credentials" error
- Check that the database columns exist
- Verify the values in `ppt_config` table
- Check browser console for errors

### Can't update credentials
- Verify you're using the correct admin password (edit password)
- Check Supabase permissions for the `ppt_config` table
- Ensure the table has UPDATE permissions

### Session not persisting
- Check that cookies are enabled in browser
- Verify the app is running on the same domain
- Check browser console for cookie errors

## API Endpoints

### `GET /api/ppt-auth`
Check if user is authenticated

### `POST /api/ppt-auth`
Login or update credentials
- Login: `{ username, password }`
- Update: `{ action: "update", currentPassword, newUsername, newPassword }`

### `DELETE /api/ppt-auth`
Logout (clears auth cookie)
