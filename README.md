# 🛡️ SHIELDNET Intelligence

<div align="center">

**Professional Cyber Threat Intelligence Platform**

*Developed by Tiz Tech Foundation*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/shieldnet-intel)
[![Status](https://img.shields.io/badge/status-production-brightgreen.svg)](https://github.com/yourusername/shieldnet-intel)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

**SHIELDNET Intelligence** is a comprehensive, cross-platform cyber threat intelligence platform designed for monitoring, analyzing, and responding to security threats in real-time. Built with modern web technologies, it provides security professionals with actionable intelligence from global threat feeds.

### Key Capabilities

- **Real-Time Threat Monitoring** - Live feeds from multiple threat intelligence sources
- **IOC Analysis** - Search and analyze indicators of compromise (IPs, domains, hashes, CVEs)
- **Automated Scanning** - Continuous threat detection and classification
- **Alert Management** - Severity-based alert system with actionable notifications
- **Intelligence Reports** - Automated PDF report generation
- **Multi-Source Integration** - Aggregates data from URLhaus, AbuseIPDB, PhishTank, and more

## ✨ Features

### 🎨 Professional Interface

- **Collapsible Sidebar Navigation** - Efficient navigation with active route highlighting
- **Dark Mode** - Eye-friendly interface optimized for security operations centers
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Dashboards** - Real-time statistics and visualizations

### 🔍 Threat Intelligence

- **Live Threat Feed** - Real-time updates from global threat databases
- **IOC Search Engine** - Comprehensive search across:
  - IP addresses
  - Domain names
  - File hashes (MD5, SHA1, SHA256)
  - CVE identifiers
- **Threat Scanner** - Automated detection with severity classification
- **Threat Scoring** - AI-powered reputation scoring system

### 🚨 Alert System

- **Real-Time Alerts** - Instant notifications for critical threats
- **Severity Classification** - Critical, High, Medium, Low categorization
- **Status Management** - Track alert lifecycle (New → Investigating → Resolved)
- **Filtering & Search** - Advanced filtering by severity, status, and source

### 📊 Reporting & Analytics

- **Automated Reports** - Weekly, monthly, and quarterly threat summaries
- **PDF Export** - Professional reports ready for stakeholder distribution
- **Trend Analysis** - Historical threat pattern visualization
- **Custom Dashboards** - Configurable widgets and metrics

### ⚙️ Configuration

- **Multi-Source Feeds** - Enable/disable specific threat intelligence sources
- **Notification Preferences** - Granular control over alert types
- **API Configuration** - Custom backend endpoints and refresh intervals
- **Appearance Settings** - Theme and layout customization

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*Real-time threat intelligence overview with interactive charts*

### IOC Search
![IOC Search](docs/screenshots/ioc-search.png)
*Comprehensive indicator of compromise lookup*

### Alert Management
![Alerts](docs/screenshots/alerts.png)
*Centralized alert monitoring and management*

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.4+
- **UI Components**: shadcn/ui (Radix UI)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router v6
- **State Management**: TanStack Query

### Backend (Optional)
- **Runtime**: Node.js 24+
- **Framework**: Express
- **Language**: TypeScript

### Data Sources
- URLhaus (Abuse.ch) - Malware URL database
- AbuseIPDB - IP reputation tracking
- PhishTank - Phishing detection
- Custom threat feeds

## 📦 Installation

### Prerequisites

- **Node.js** v20.0.0 or higher
- **npm** v10.0.0 or higher
- **Git** (for cloning the repository)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/shieldnet-intel.git

# Navigate to project directory
cd shieldnet-intel

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Usage

### Basic Usage

1. **Dashboard** - View real-time threat statistics and recent activity
2. **Live Feed** - Monitor incoming threats from global sources
3. **IOC Search** - Look up specific indicators:
   ```
   Example searches:
   - IP: 192.168.1.1
   - Domain: malicious-site.com
   - Hash: d41d8cd98f00b204e9800998ecf8427e
   - CVE: CVE-2024-1234
   ```
4. **Scanner** - Run automated threat scans
5. **Alerts** - Review and manage security alerts
6. **Reports** - Generate and download threat intelligence reports
7. **Settings** - Configure data sources and preferences

### Advanced Features

#### Custom Threat Feeds

Configure custom threat intelligence sources in Settings:

```javascript
// Example: Adding a custom feed
{
  name: "Custom Feed",
  url: "https://api.example.com/threats",
  enabled: true,
  refreshInterval: 300
}
```

#### API Integration

ShieldNet can integrate with backend threat scanning services:

```bash
# Set backend URL in Settings or environment variable
VITE_BACKEND_URL=http://localhost:3001
```

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────┐
│              Frontend (React)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Dashboard │  │IOC Search│  │  Alerts  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │Live Feed │  │ Scanner  │  │ Reports  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│         Threat Service Layer                     │
│  ┌────────────────────────────────────────┐     │
│  │  - Live Data Fetching                  │     │
│  │  - High-Fidelity Simulation            │     │
│  │  - Threat Classification               │     │
│  └────────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│  Public APIs     │  │  Optional        │
│  - URLhaus       │  │  Backend         │
│  - AbuseIPDB     │  │  - System Scan   │
│  - PhishTank     │  │  - Network Mon   │
└──────────────────┘  └──────────────────┘
```

### Project Structure

```
shieldnet-intel/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── ThreatFeed.tsx  # Threat feed display
│   │   ├── ThreatChart.tsx # Visualization charts
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── IOCSearch.tsx   # IOC lookup
│   │   ├── Alerts.tsx      # Alert management
│   │   └── ...
│   ├── services/           # Business logic
│   │   └── threatService.ts # Threat data handling
│   ├── integrations/       # External integrations
│   └── lib/               # Utilities
├── public/                # Static assets
├── server/                # Optional backend (Node.js)
└── docs/                  # Documentation
```

## 📚 API Reference

### Threat Service

```typescript
import { threatService } from '@/services/threatService';

// Get current threats
const threats = await threatService.getThreats();

// Run threat scan
const results = await threatService.scan();

// Calculate statistics
const stats = threatService.calculateStats(threats);
```

### Backend API (Optional)

```bash
# System scan
POST /api/scan/system

# Network monitoring
GET /api/network/connections

# Full threat scan
POST /api/scan/full
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Add tests for new features

### Reporting Issues

Use GitHub Issues to report bugs or request features. Please include:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tiz Tech Foundation** - Development and maintenance
- **Abuse.ch** - URLhaus threat database
- **AbuseIPDB** - IP reputation data
- **shadcn/ui** - UI component library
- **Lucide** - Icon system

## 📞 Support

- **Documentation**: [View Docs](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/shieldnet-intel/issues)
- **Email**: support@tiztech.org

## 🔄 Changelog

### Version 1.0.0 (2025-11-26)
- ✨ Initial release
- 🎨 Professional UI with sidebar navigation
- 🔍 IOC search functionality
- 🚨 Alert management system
- 📊 Automated reporting
- ⚙️ Comprehensive settings
- 🌐 Multi-source threat intelligence integration

---

<div align="center">

**Made with ❤️ by Tiz Tech Foundation**

[⬆ Back to Top](#️-shieldnet-intelligence)

</div>
