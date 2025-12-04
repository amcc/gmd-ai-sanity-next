#!/bin/bash

# Sanity Webhook Setup Script for AI Site

PROJECT_ID="jwhest7p"
DATASET="production"
SITE_URL="https://ai.gmdlcc.com"

echo "Setting up Sanity webhooks for ISR revalidation..."

# FAQ webhook
echo "Creating FAQ webhook..."
npx sanity hook create \
  --name "FAQ Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "faq"' \
  --method GET \
  --project-id $PROJECT_ID \
  --dataset $DATASET

# Homepage webhook
echo "Creating homepage webhook..."
npx sanity hook create \
  --name "Homepage Updates" \
  --url "${SITE_URL}/api/revalidate" \
  --filter '_type == "homepageSingleton"' \
  --method GET \
  --project-id $PROJECT_ID \
  --dataset $DATASET

echo ""
echo "✓ Webhook setup complete!"
echo ""
echo "Your webhooks are now configured to revalidate ${SITE_URL} when:"
echo "  - FAQ documents are created, updated, or deleted"
echo "  - Homepage singleton is updated"
