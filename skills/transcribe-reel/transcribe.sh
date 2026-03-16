#!/bin/bash
# Transcribe Instagram Reel - OpenClaw Skill Wrapper
# Called by Claw when user asks to transcribe a reel

set -e

URL="$1"
SOURCE_FILE="${2:-}"

if [ -z "$URL" ]; then
    echo "Error: No URL provided"
    echo "Usage: transcribe.sh <instagram-url> [source-markdown-file]"
    exit 1
fi

# Use the main transcription script
SCRIPT_PATH="$HOME/Documents/life/tasks/reels-library/transcribe-skill.sh"

if [ ! -f "$SCRIPT_PATH" ]; then
    echo "Error: Transcription script not found: $SCRIPT_PATH"
    exit 1
fi

# If no source file specified, try to detect from context
if [ -z "$SOURCE_FILE" ]; then
    # Check common locations
    for file in ~/Documents/life/links/{ai,tech,security,history}.md; do
        if [ -f "$file" ] && grep -q "$URL" "$file" 2>/dev/null; then
            SOURCE_FILE="$file"
            break
        fi
    done
fi

if [ -z "$SOURCE_FILE" ]; then
    echo "⚠️  Source markdown file not found. Transcript will be saved but not linked."
    echo "   Run manually with: $SCRIPT_PATH \"$URL\" <markdown-file>"
    echo ""
    # Just transcribe without updating markdown
    POST_ID=$(echo "$URL" | grep -oE '/(p|reel)/([^/]+)' | cut -d'/' -f3)
    TRANSCRIPT_DIR="$HOME/Documents/life/links/transcriptions"
    mkdir -p "$TRANSCRIPT_DIR"
    
    TEMP_DIR=$(mktemp -d)
    echo "📥 Downloading reel: $POST_ID"
    yt-dlp "$URL" -o "$TEMP_DIR/video.mp4" --quiet --no-warnings
    
    echo "📝 Transcribing..."
    cd "$TEMP_DIR"
    whisper video.mp4 --model medium --output_format txt --output_dir . >/dev/null 2>&1
    
    mv "$TEMP_DIR/video.txt" "$TRANSCRIPT_DIR/${POST_ID}.txt"
    rm -rf "$TEMP_DIR"
    
    echo "✅ Transcript saved: transcriptions/${POST_ID}.txt"
    cat "$TRANSCRIPT_DIR/${POST_ID}.txt"
else
    # Run full workflow with markdown update
    "$SCRIPT_PATH" "$URL" "$SOURCE_FILE"
fi
