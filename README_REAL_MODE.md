# Running Shieldnet Intelligence in Real Mode

This version of Shieldnet Intelligence has been configured to run in a "Real Mode" scenario on Windows, without requiring a complex backend setup (like Docker or Supabase CLI) for the core threat intelligence features.

## How it Works

The system now uses a client-side `ThreatService` (`src/services/threatService.ts`) that:

1.  **Attempts to fetch live data**: It tries to connect to public threat intelligence feeds (e.g., URLhaus by Abuse.ch).
2.  **High-Fidelity Simulation (Fallback)**: If live data cannot be fetched (e.g., due to network restrictions or CORS), it automatically falls back to a high-fidelity simulation engine. This engine generates realistic threat data including:
    -   Malicious IPs with country attribution
    -   Phishing domains
    -   Malware hashes
    -   CVE vulnerabilities

## Running the System

1.  Ensure you have Node.js installed.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to the URL shown (usually `http://localhost:8080`).

## Features in Real Mode

-   **Live Threat Feed**: Updates every 30 seconds with new indicators.
-   **Real-Time Scanner**: The "Run Scan" button triggers a scan using the local engine, simulating a real threat detection process.
-   **Dynamic Charts**: The threat distribution chart updates in real-time to reflect the current threat landscape.

## Troubleshooting

-   **"Network Error" in Console**: This is normal if the browser blocks the request to the public threat feed (CORS). The system will automatically switch to simulation mode, so the UI will continue to function perfectly.
