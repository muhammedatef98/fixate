# GitHub Actions Auto-Deployment Setup

## Overview

This workflow automatically deploys your code to Hostinger whenever you push to the `main` branch.

---

## Setup Instructions

### 1. Add GitHub Secrets

Go to your repository settings: `https://github.com/muhammedatef98/fixate/settings/secrets/actions`

Click **"New repository secret"** and add the following secrets:

#### Required Secrets:

1. **SSH_HOST**
   - Value: Your Hostinger server IP or domain
   - Example: `123.45.67.89` or `fixate.site`

2. **SSH_USERNAME**
   - Value: Your SSH username
   - Example: `muhammedatef98` or `u123456789`

3. **SSH_PASSWORD**
   - Value: Your SSH password
   - Example: `@Apollo111969`

4. **SSH_PORT**
   - Value: SSH port (usually 22)
   - Example: `22`

5. **DEPLOY_PATH**
   - Value: Full path to your project on the server
   - Example: `/home/muhammedatef98/public_html/fixate`
   - Or: `/var/www/fixate`

6. **DB_USERNAME**
   - Value: PostgreSQL database username
   - Example: `muhammedatef98` or `fixate_user`

7. **DB_NAME**
   - Value: PostgreSQL database name
   - Example: `fixate_db`

---

## How to Find Your Hostinger Information

### Option 1: Via Hostinger Panel

1. Login to https://hpanel.hostinger.com
2. Go to **Hosting** → Select your website
3. Click **Advanced** → **SSH Access**
4. You'll find:
   - SSH Host
   - SSH Port
   - SSH Username

### Option 2: Via Email

Check your Hostinger welcome email for:
- Server IP address
- SSH credentials
- Database information

---

## Testing the Deployment

### Manual Test

1. Go to: `https://github.com/muhammedatef98/fixate/actions`
2. Click on **"Deploy to Hostinger"** workflow
3. Click **"Run workflow"** → **"Run workflow"** button
4. Watch the deployment progress

### Automatic Test

1. Make any small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: trigger deployment"
   git push origin main
   ```
3. Check Actions tab to see deployment progress

---

## What Happens During Deployment

1. ✅ Code is checked out from GitHub
2. ✅ Node.js and pnpm are installed
3. ✅ Dependencies are installed
4. ✅ Project is built
5. ✅ Code is deployed to Hostinger via SSH
6. ✅ Server pulls latest code
7. ✅ Server installs dependencies
8. ✅ Server builds the project
9. ✅ PM2 restarts the application
10. ✅ Database migration runs (only once)

---

## Troubleshooting

### Issue: "Permission denied (publickey)"

**Solution:** Make sure you're using password authentication, not SSH keys.
Add this to your secrets:
- SSH_PASSWORD: Your actual password

### Issue: "Host key verification failed"

**Solution:** The workflow uses password authentication which should bypass this.
If it persists, you may need to add the host to known_hosts first.

### Issue: "pm2 command not found"

**Solution:** Install PM2 on your server:
```bash
npm install -g pm2
```

### Issue: "psql command not found"

**Solution:** PostgreSQL is not installed or not in PATH.
Install it or use the full path:
```bash
/usr/bin/psql -U username -d database_name -f migration.sql
```

---

## Alternative: FTP Deployment

If SSH is not available, you can use FTP deployment instead.

Replace the SSH action with FTP action:

```yaml
- name: Deploy via FTP
  uses: SamKirkland/FTP-Deploy-Action@v4.3.4
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./dist/
    server-dir: /public_html/
```

---

## Security Notes

⚠️ **Important:**
- Never commit secrets to the repository
- Always use GitHub Secrets for sensitive data
- Rotate passwords regularly
- Use SSH keys instead of passwords when possible

---

## Next Steps

After setup:

1. ✅ Add all required secrets to GitHub
2. ✅ Test the deployment manually
3. ✅ Make a small change and push to trigger auto-deployment
4. ✅ Verify the site is updated at https://fixate.site
5. ✅ Check database migration completed successfully

---

## Support

If you need help:
- Check GitHub Actions logs for error messages
- Contact Hostinger support for server access issues
- Email: fixate01@gmail.com

---

**Status:** ✅ Ready to use
**Last Updated:** December 2024
