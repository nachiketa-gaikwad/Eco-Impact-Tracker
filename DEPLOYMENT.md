# GreenPoints - Deployment Guide

Complete guide for deploying GreenPoints on Replit and other platforms.

## Replit Deployment (Recommended)

GreenPoints is optimized for Replit deployment with zero configuration.

### Prerequisites

- Replit account
- PostgreSQL database (automatically provisioned)

### Automatic Setup

1. **Import/Open Project in Replit**
   - All dependencies are automatically installed
   - Database is automatically provisioned
   - Environment variables are pre-configured

2. **Database Initialization**
   The database schema is automatically created and seeded when you first run the app:
   ```bash
   npm run db:push
   ```
   This command:
   - Creates all tables (users, bills, lineItems, products, pointsLedger)
   - Sets up relationships and indexes
   - Seeds 20 sample products

3. **Start Application**
   Click "Run" or use the "Start application" workflow:
   ```bash
   npm run dev
   ```

4. **Access Your App**
   - Development: `https://your-repl-name.your-username.repl.co`
   - The app runs on port 5000 (automatically configured)

### Environment Variables (Auto-Configured)

The following are automatically set by Replit:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`
- `SESSION_SECRET` - Secure session key

**No manual configuration needed!**

---

## Production Deployment (Other Platforms)

### Heroku

1. **Create Heroku App**
   ```bash
   heroku create greenpoints-app
   ```

2. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set SESSION_SECRET=$(openssl rand -hex 32)
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Initialize Database**
   ```bash
   heroku run npm run db:push
   ```

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Link Project**
   ```bash
   vercel link
   ```

3. **Add PostgreSQL Database**
   - Use Vercel Postgres or external provider (Neon, Supabase)
   - Add `DATABASE_URL` to environment variables

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Railway

1. **Create Project**
   ```bash
   railway init
   ```

2. **Add PostgreSQL**
   ```bash
   railway add postgresql
   ```

3. **Deploy**
   ```bash
   railway up
   ```

---

## Post-Deployment Checklist

- [ ] Database schema created and seeded
- [ ] Sample products visible in admin panel
- [ ] Bill upload works
- [ ] OCR processing completes
- [ ] Points calculation works
- [ ] Dashboard shows statistics
- [ ] Dark mode toggle works

---

## Scaling Considerations

### Current Architecture
- Single server deployment
- Synchronous OCR processing
- Local image storage

### For High Traffic

#### 1. Separate OCR Processing
```
User → API → Queue (Redis) → Worker → OCR → Database
```

**Implementation**:
- Use Bull/BullMQ for job queue
- Separate worker process for OCR
- Polling endpoint for status updates

#### 2. Cloud Image Storage
- **AWS S3**: Scalable, reliable
- **Cloudflare R2**: No egress fees
- **Cloudinary**: Built-in transformations

**Changes Required**:
- Update upload route to send to cloud
- Store URL instead of local path
- Implement signed URLs for security

#### 3. Database Optimization
- **Indexes**: Add to frequently queried columns
- **Read Replicas**: For dashboard queries
- **Caching**: Redis for product matches
- **Connection Pooling**: PgBouncer

#### 4. Frontend CDN
- Static asset caching
- Faster global delivery
- Reduced server load

---

## Environment Variables Reference

### Required
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Secure random string | `openssl rand -hex 32` |

### Optional
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |

---

## Troubleshooting

### Database Issues

**Error**: "DATABASE_URL must be set"
```bash
# Check if DATABASE_URL exists
echo $DATABASE_URL

# On Replit, database auto-provisions
# On other platforms, add PostgreSQL addon
```

**Error**: "relation does not exist"
```bash
# Run database migration
npm run db:push
```

### OCR Processing Slow

**Issue**: Bills taking >30 seconds to process

**Solutions**:
1. Reduce image size before upload
2. Move OCR to background worker
3. Use cloud OCR service (Google Vision, AWS Textract)

### Upload Failures

**Error**: "Only image files are allowed"
- Ensure file is JPG, PNG, or HEIC
- Check file size < 10MB

**Error**: "This bill has already been scanned"
- Duplicate detection working correctly
- Try different receipt image

---

## Monitoring & Logging

### Development
```bash
# Server logs
npm run dev

# Database logs
DATABASE_URL=... psql -c "SELECT * FROM bills ORDER BY scanDate DESC LIMIT 10;"
```

### Production

**Recommended Services**:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **DataDog**: Performance monitoring
- **Better Stack**: Log aggregation

---

## Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials not in code
- [ ] File upload size limits enforced
- [ ] Input validation on all endpoints
- [ ] CORS configured for production domain
- [ ] Rate limiting implemented
- [ ] HTTPS enabled
- [ ] Helmet middleware added

---

## Backup & Recovery

### Database Backup
```bash
# Automated daily backups (recommended)
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup_20240115.sql
```

### Image Backup
- Configure cloud storage replication
- Implement soft delete for bills
- Regular backup to secondary storage

---

## Performance Benchmarks

### Expected Response Times
- Bill upload: < 500ms
- OCR processing: 10-15s
- Dashboard load: < 200ms
- Product search: < 100ms
- Award points: < 300ms

### Load Testing
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:5000/api/products

# Using k6
k6 run load-test.js
```

---

## Support

For issues or questions:
1. Check logs for error messages
2. Verify environment variables
3. Confirm database connection
4. Test with sample data
5. Review API documentation

---

**Last Updated**: October 27, 2025  
**Platform**: Replit-optimized, works on Heroku, Vercel, Railway
