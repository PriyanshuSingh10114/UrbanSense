# UrbanSense 🏙️🌿
**AI-Powered Urban Air Intelligence Platform for Smart City Intervention**

![UrbanSense Banner](https://img.shields.io/badge/Platform-UrbanSense-06b6d4?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostGIS-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 📖 The Problem
City administrators currently rely on **reactive** air quality monitoring. They can see that pollution is high, but they lack the tools to instantly determine **why** it's high or **where exactly** the emissions are coming from. This results in delayed responses and generalized health advisories that lack actionable context.

## 💡 The Solution
UrbanSense is an enterprise-grade AI platform that fuses IoT telemetry, geospatial analysis (PostGIS), and Google Gemini AI to move from reactive monitoring to **proactive intervention**. 

### Key Features
1. **Gemini Pollution Attribution Agent**: Automatically deduces the root cause of localized AQI spikes by analyzing real-time wind vectors against nearby registered pollution sources (factories, traffic hubs).
2. **Predictive Time-Series Forecasting**: Machine Learning models forecast hyperlocal air quality up to 24 hours in advance.
3. **Live Geospatial Command Center**: A stunning dark-mode Next.js dashboard featuring live CARTO-mapped pollution layers and Recharts analytics.
4. **Enforcement Intelligence**: Instantly flags critical spikes and allows administrators to dispatch officers to the attributed source.
5. **Citizen Health Portal**: Generates AI-tailored, localized health advisories for the public.

---

## 🛠️ Tech Stack Architecture (Clean Monolith)
- **Frontend**: Next.js 15, React 19, TailwindCSS v4, ShadCN UI, Recharts, React-Leaflet, Framer Motion.
- **Backend API**: Python 3.11+, FastAPI, Pydantic V2.
- **Database**: PostgreSQL with PostGIS (via GeoAlchemy2).
- **AI/ML Engine**: Google Gemini Pro (Attribution & Health Agents) + Custom Heuristics.
- **Asynchronous Task Queue**: Celery & Redis (for data ingestion).
- **Security**: Stateless JWT Authentication & Role-Based Access Control (RBAC).

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- Gemini API Key

### 2. Environment Setup
```bash
# Clone the repository
git clone https://github.com/PriyanshuSingh10114/UrbanSense.git
cd UrbanSense

# Configure Backend Environment
cp backend/.env.example backend/.env
# Edit backend/.env and add your GEMINI_API_KEY
```

### 3. Spin up Infrastructure (Database & Redis)
```bash
docker-compose up -d db redis
```

### 4. Run the Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # (or .venv\Scripts\activate on Windows)
pip install -r requirements.txt
alembic upgrade head       # Apply DB migrations
uvicorn app.main:app --reload --port 8000
```

### 5. Run the Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

### 6. Access the Platform
- **Dashboard**: `http://localhost:3000`
- **Citizen Portal**: `http://localhost:3000/citizen`
- **API Swagger Docs**: `http://localhost:8000/docs`

---
*Built with ❤️ for the Hackathon.*
