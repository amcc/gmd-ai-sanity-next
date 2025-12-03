#!/bin/bash

# Sanity Webhook Setup Script
# Replace these variables with your actual values

PROJECT_ID="your-project-id"
DATASET="production"
SITE_URL="https://yourdomain.com"
SECRET="your-secure-secret-key-here"

echo "Setting up Sanity webhooks for ISR revalidation..."

# Artwork webhook
echo "Creating artwork webhook..."
npx sanity hook create \
  --name "Artwork Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "artwork"' \
  --body '{"secret": "'$SECRET'", "_type": "{{document._type}}", "slug": {{document.slug}}, "_id": "{{document._id}}", "operation": "{{operation}}"}' \
  --headers '{"Content-Type": "application/json"}' \
  --project-id $PROJECT_ID \
  --dataset $DATASET

# Biography webhook  
echo "Creating biography webhook..."
npx sanity hook create \
  --name "Biography Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "biography"' \
  --body '{"secret": "'$SECRET'", "_type": "{{document._type}}", "slug": {{document.slug}}, "_id": "{{document._id}}", "operation": "{{operation}}"}' \
  --headers '{"Content-Type": "application/json"}' \
  --project-id $PROJECT_ID \
  --dataset $DATASET

# Studio webhook
echo "Creating studio webhook..."  
npx sanity hook create \
  --name "Studio Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "studio"' \
  --body '{"secret": "'$SECRET'", "_type": "{{document._type}}", "slug": {{document.slug}}, "_id": "{{document._id}}", "operation": "{{operation}}"}' \
  --headers '{"Content-Type": "application/json"}' \
  --project-id $PROJECT_ID \
  --dataset $DATASET

# Homepage webhook
echo "Creating homepage webhook..."
npx sanity hook create \
  --name "Homepage Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "homepageSingleton"' \
  --body '{"secret": "'$SECRET'", "_type": "{{document._type}}", "_id": "{{document._id}}", "operation": "{{operation}}"}' \
  --headers '{"Content-Type": "application/json"}' \
  --project-id $PROJECT_ID \
  --dataset $DATASET

echo "Webhook setup complete!"
echo "Remember to:"
echo "1. Replace the placeholder values with your actual site URL and secret"
echo "2. Set up the REVALIDATE_SECRET environment variable"
echo "3. Deploy your site to the production URL"
