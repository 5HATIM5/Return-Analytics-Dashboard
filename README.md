# 🔄 Return Analytics Dashboard

A modern React dashboard for analyzing product return patterns and generating actionable insights.

## 🚀 Features

- **📊 Dashboard Cards**: Quick overview of key metrics (Total Returns, Affected Products, Top Return Reason, Most Problematic Product)
- **📋 Analytics Table**: Detailed view of return data by product variant with pagination
- **📈 Return Breakdown**: Visual charts showing return reasons for each product
- **💡 Insights Management**: Add and view insights for better decision making
- **🎨 Modern UI**: Clean, responsive design with modal-based interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Styling**: CSS3 with modern design patterns
- **Package Manager**: pnpm (workspace)

## 📦 Project Structure

```
Return-Analytics-Dashboard/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   ├── types/           # TypeScript definitions
│   │   └── App.tsx          # Main application
│   └── package.json
├── backend/                  # Express API server
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── models/          # Data models
│   ├── data/                # JSON data files
│   └── package.json
└── package.json             # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Return-Analytics-Dashboard

# Install dependencies
pnpm install
```

### Development
```bash
# Start backend server (Port 3001)
cd backend
pnpm dev

# Start frontend (Port 5173)
cd frontend  
pnpm dev
```

### Build
```bash
# Build frontend
cd frontend
pnpm build

# Build backend
cd backend
pnpm build
```

## 📊 Dashboard Features

### Dashboard Cards
- **Total Returns**: Aggregate return count across all variants
- **Affected Products**: Number of unique products with returns
- **Top Return Reason**: Most common return reason with count
- **Most Problematic**: Product with highest return count

### Analytics Table
- Paginated view of all product variants
- Sortable by return count
- Quick actions: View Details & Add Insight
- Responsive design

### Modal Interactions
- **Details Modal**: View return reason breakdown with charts
- **Insight Modal**: Add insights and notes for products

## 🔧 API Endpoints

- `GET /api/analytics/variants` - Get variant analytics
- `GET /api/analytics/dashboard` - Get dashboard metrics
- `GET /api/insights` - Get saved insights
- `POST /api/insights` - Save new insight

## 🎨 UI Components

- **DashboardCards**: Overview metrics display
- **VariantAnalyticsTable**: Data table with pagination
- **ReasonBreakdown**: Return reason visualization
- **InsightForm**: Modal for adding insights
- **Modal**: Reusable modal component


## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ using React and TypeScript
