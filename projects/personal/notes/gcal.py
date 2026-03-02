#!/usr/bin/env python3
"""
Google Calendar API wrapper - bypasses Keychain, stores tokens in files.

Usage:
  python gcal.py auth                    # Authenticate (one-time)
  python gcal.py list                    # List upcoming events
  python gcal.py today                   # Today's events
  python gcal.py week                    # This week's events
"""

import os
import sys
import json
from datetime import datetime, timedelta
from pathlib import Path

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip3 install google-auth-oauthlib google-api-python-client")
    sys.exit(1)

# Config
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
TOKEN_FILE = Path.home() / '.config' / 'openclaw' / 'google-calendar-token.json'
CREDENTIALS_FILE = Path.home() / '.config' / 'openclaw' / 'google-calendar-credentials.json'

def get_credentials():
    """Get valid credentials (from file or fresh OAuth)."""
    creds = None
    
    # Load existing token
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
    
    # Refresh or get new token
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(f"❌ Credentials file not found: {CREDENTIALS_FILE}")
                print("\nCreate OAuth credentials:")
                print("1. Go to: https://console.cloud.google.com/apis/credentials")
                print("2. Create OAuth 2.0 Client ID (Desktop app)")
                print("3. Download JSON")
                print(f"4. Save to: {CREDENTIALS_FILE}")
                sys.exit(1)
            
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDENTIALS_FILE), SCOPES)
            creds = flow.run_local_server(port=0)
        
        # Save token to file (NOT Keychain!)
        TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
        TOKEN_FILE.write_text(creds.to_json())
        print(f"✅ Token saved to: {TOKEN_FILE}")
    
    return creds

def list_events(time_min=None, time_max=None, max_results=10):
    """List calendar events."""
    creds = get_credentials()
    service = build('calendar', 'v3', credentials=creds)
    
    if not time_min:
        time_min = datetime.utcnow().isoformat() + 'Z'
    
    events_result = service.events().list(
        calendarId='primary',
        timeMin=time_min,
        timeMax=time_max,
        maxResults=max_results,
        singleEvents=True,
        orderBy='startTime'
    ).execute()
    
    events = events_result.get('items', [])
    
    if not events:
        print('No upcoming events found.')
        return []
    
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(f"{start} - {event['summary']}")
    
    return events

def today_events():
    """Get today's events."""
    now = datetime.now()
    start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=1)
    
    print(f"📅 Events for {start.strftime('%A, %B %d, %Y')}:\n")
    return list_events(
        time_min=start.isoformat() + 'Z',
        time_max=end.isoformat() + 'Z',
        max_results=50
    )

def week_events():
    """Get this week's events."""
    now = datetime.now()
    start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + timedelta(days=7)
    
    print(f"📅 Events for next 7 days:\n")
    return list_events(
        time_min=start.isoformat() + 'Z',
        time_max=end.isoformat() + 'Z',
        max_results=100
    )

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == 'auth':
        get_credentials()
        print("✅ Authentication successful!")
    elif command == 'list':
        list_events()
    elif command == 'today':
        today_events()
    elif command == 'week':
        week_events()
    else:
        print(f"Unknown command: {command}")
        print(__doc__)
        sys.exit(1)

if __name__ == '__main__':
    main()
