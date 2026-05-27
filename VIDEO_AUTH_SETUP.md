# Video Page Authentication Setup Guide

## Overview
The Video page now has **authentication** with admin panel:
1. **Page Access Authentication** - Username + Password required to VIEW the video page
2. **Admin Panel** - Change access credentials on-the-fly

## Database Setup

You need to create a `video_config` table in Supabase:

### SQL Migration

```sql
-- Create video_config table
CREATE TABLE IF NOT EXISTS video_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  access_username TEXT DEFAULT 'videohub',
  access_password TEXT DEFAULT 'Video@2026',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row
INSERT INTO video_config (id, access_username, access_password)
VALUES ('main', 'videohub', 'Video@2026')
ON CONFLICT (id) DO NOTHING;
```

Run this in your Supabase SQL Editor.

## Default Credentials

### Page Access
- **Username**: `videohub`
- **Password**: `Video@2026`

### Admin Panel
- **Admin Password**: `VideoHub@123` (or value from `VIDEO_ADMIN_PASSWORD` env var)

## How to Change Access Credentials

### Using the Admin Panel (Recommended)
1. Login to the Video page with current credentials
2. Click the **Admin** button (top-right corner)
3. Enter the **Admin Password**: `VideoHub@123`
4. Enter the new username and password
5. Click "Update Credentials"
6. Done! Users will now need the new credentials to access the page

### Direct Database Update
1. Go to Supabase Dashboard → Table Editor
2. Open the `video_config` table
3. Find the row where `id = 'main'`
4. Edit the `access_username` and `access_password` columns
5. Save changes

## Features

- ✅ Login screen before viewing video page
- ✅ Session cookie (24-hour expiration)
- ✅ Logout button (top-right)
- ✅ Admin panel for changing credentials
- ✅ Shows current credentials in admin panel
- ✅ Password visibility toggle
- ✅ Separate from PPT page credentials

## Environment Variables

Make sure these are set in your `.env.local` or Vercel environment:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
VIDEO_ADMIN_PASSWORD=VideoHub@123  # Optional, defaults to this value
```

## Security Notes

1. **Session Duration**: Auth cookie expires after 24 hours
2. **Admin Password**: The `VIDEO_ADMIN_PASSWORD` env var protects the admin panel
3. **HTTPS Required**: In production, cookies are secure and require HTTPS
4. **Path-Scoped**: Auth cookie only works for `/video` path
5. **Independent**: Video page credentials are completely separate from PPT page

## Testing

1. Visit `/video` page
2. You should see the login screen
3. Enter default credentials:
   - Username: `videohub`
   - Password: `Video@2026`
4. After login, you should see the video player
5. Test the Admin button to change credentials
6. Test logout and re-login with new credentials

## Comparison: PPT vs Video

| Feature | PPT Page | Video Page |
|---------|----------|------------|
| Login Username | `purplehub` | `videohub` |
| Login Password | `Purple@2026` | `Video@2026` |
| Admin Password | `Purplehub@123` | `VideoHub@123` |
| Database Table | `ppt_config` | `video_config` |
| Cookie Name | `ppt_auth_token` | `video_auth_token` |
| Path | `/ppt` | `/video` |

**They are completely independent!** Changing one doesn't affect the other.
