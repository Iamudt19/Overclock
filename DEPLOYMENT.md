# Deployment Guide - Overclock

## Deploy to Vercel

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub account with the repository pushed

### Steps

#### 1. Import Project to Vercel
```bash
# Visit: https://vercel.com/new
# Select "Import Git Repository"
# Connect your GitHub account and select: Iamudt19/Overclock
```

#### 2. Configure Project Settings
In Vercel dashboard:
- **Framework Preset**: Next.js
- **Root Directory**: `overclock` (if needed)
- **Node Version**: 18.x or higher

#### 3. Add Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
JWT_SECRET=your_strong_secret_key_here_change_this
DATABASE_URL=file:./prisma/dev.db
```

**For production** (recommended to use PostgreSQL or MySQL):
If you want to use a real database instead of SQLite:

```
DATABASE_URL=postgresql://user:password@host:5432/database_name
# or
DATABASE_URL=mysql://user:password@host:3306/database_name
```

#### 4. Deploy
- Click "Deploy" button
- Vercel will automatically build and deploy
- Your app will be live at `your-project.vercel.app`

### Post-Deployment

#### Run Database Migrations
After first deployment, you need to run migrations:

```bash
# Option 1: Via Vercel CLI
vercel env pull  # Pull environment variables
npx prisma migrate deploy

# Option 2: Via dashboard
# Create a deployment hook to run migrations automatically
```

#### Setup Automatic Migrations (Recommended)
In `package.json`, update build script:

```json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

Then add to a new file `.vercel/project.json`:
```json
{
  "buildCommand": "prisma generate && next build",
  "outputDirectory": ".next"
}
```

### Troubleshooting

**Issue**: Database not syncing
- **Solution**: Run `npx prisma migrate deploy` in Vercel CLI or add post-build hook

**Issue**: "env.DATABASE_URL undefined"
- **Solution**: Verify environment variable is set in Vercel dashboard (Settings → Environment Variables)

**Issue**: SQLite file not persisting
- **Solution**: For production, switch to PostgreSQL/MySQL (SQLite doesn't persist on serverless)

### Recommended: Switch to PostgreSQL (Production)

For a free PostgreSQL database:
1. Sign up at https://www.railway.app or https://www.supabase.com
2. Create a PostgreSQL database
3. Copy connection string to `DATABASE_URL` in Vercel
4. Run: `npx prisma migrate deploy`

### Local Testing Before Deploy

```bash
npm run dev        # Test locally
git add .
git commit -m "your message"
git push origin main
# Vercel will auto-deploy on push
```

### API Endpoints (After Deployment)

**Signup**: `POST /api/auth/signup`
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Login**: `POST /api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Create Expense**: `POST /api/expenses`
```json
{
  "amount": 50.00,
  "category": "Food",
  "description": "Lunch",
  "date": "2025-11-27"
}
```
(Requires `Authorization: Bearer <token>` header)

**Get Expenses**: `GET /api/expenses`
(Requires `Authorization: Bearer <token>` header)

**Create Income**: `POST /api/income`
```json
{
  "amount": 1500.00,
  "source": "Salary",
  "description": "Monthly salary",
  "date": "2025-11-27"
}
```

**Get Income**: `GET /api/income`
(Requires `Authorization: Bearer <token>` header)
