#!/bin/bash
# Ingest scans from iCloud/scans to Paperless-ngx NAS

set -e

# Load env
source ~/Documents/personal/.env

SCANS_DIR=~/Library/Mobile\ Documents/com~apple~CloudDocs/scans
PAPERLESS_URL="http://$NAS_HOST:8010"
PAPERLESS_TOKEN="$PAPERLESS_TOKEN"  # TODO: Add to .env

# Check if scans folder exists
if [ ! -d "$SCANS_DIR" ]; then
  echo "❌ Scans folder not found: $SCANS_DIR"
  exit 1
fi

# Count files
FILE_COUNT=$(find "$SCANS_DIR" -type f \( -name "*.pdf" -o -name "*.jpg" -o -name "*.png" \) | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ]; then
  echo "✅ No scans to ingest"
  exit 0
fi

echo "📄 Found $FILE_COUNT files to ingest"

# Upload each file to Paperless
find "$SCANS_DIR" -type f \( -name "*.pdf" -o -name "*.jpg" -o -name "*.png" \) | while read -r file; do
  filename=$(basename "$file")
  echo "Uploading: $filename"
  
  # Upload via Paperless API
  curl -X POST "$PAPERLESS_URL/api/documents/post_document/" \
    -H "Authorization: Token $PAPERLESS_TOKEN" \
    -F "document=@$file" \
    -F "title=$filename" \
    2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "✅ Uploaded: $filename"
    # Delete from iCloud after successful upload
    rm "$file"
  else
    echo "❌ Failed: $filename"
  fi
done

echo "✅ Ingestion complete"
