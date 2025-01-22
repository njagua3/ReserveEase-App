# ReserveEase - Restaurant Reservation System

ReserveEase is a modern, user-friendly restaurant reservation system built with React and TypeScript. It provides an intuitive interface for guests to book tables and for restaurant staff to manage reservations efficiently.

![ReserveEase Screenshot](https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80)

## 🚀 Quick Start

### Demo Credentials

#### Admin Access
- Email: admin@reservease.com
- Password: Admin123!

#### User Access
- Email: user@reservease.com
- Password: User123!

### Available Tables
- 12 tables in total
- Capacities ranging from 2 to 8 guests
- Distribution:
  - 3 tables for 2 guests
  - 3 tables for 4 guests
  - 3 tables for 6 guests
  - 3 tables for 8 guests

## ✨ Features

### For Customers
- 🔍 Real-time table availability search
- 📅 Easy-to-use booking interface
- 📱 Fully responsive design for all devices
- 🌙 Dark/Light mode support
- ✉️ Instant booking confirmations
- 📋 Reservation management
- ⭐ Review system

### For Restaurant Staff
- 📊 Comprehensive admin dashboard
- 📈 Real-time analytics and insights
- 👥 Customer management
- 🗓️ Reservation overview
- 📊 Occupancy tracking
- 🔔 Notification system

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI development
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Navigation
- **Lucide React** - Beautiful icons
- **date-fns** - Date manipulation
- **Vite** - Fast build tool

### Backend (Planned)
- **Node.js with Express**
- **PostgreSQL (via Supabase)**
- **Supabase Authentication**
- **Supabase Real-time subscriptions**

## 🗄️ Data Structure

### Database Schema

```sql
-- Users table (handled by Supabase Auth)
auth.users

-- Tables
tables (
  id uuid primary key,
  table_number text unique,
  capacity int,
  is_available boolean,
  created_at timestamptz default now()
)

-- Reservations
reservations (
  id uuid primary key,
  user_id uuid references auth.users,
  table_id uuid references tables,
  date date,
  time time,
  party_size int,
  status text,
  created_at timestamptz default now()
)

-- Reviews
reviews (
  id uuid primary key,
  reservation_id uuid references reservations,
  user_id uuid references auth.users,
  rating int,
  comment text,
  created_at timestamptz default now()
)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/reservease.git
cd reservease
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## 📱 Responsive Design

ReserveEase is built with a mobile-first approach, ensuring a great user experience across all devices:

- 📱 Mobile devices (320px and up)
- 📱 Tablets (640px and up)
- 💻 Laptops (1024px and up)
- 🖥️ Desktops (1280px and up)

## 🎨 Theme Support

The application supports both light and dark themes:

- 🌞 Light theme for daytime use
- 🌙 Dark theme for comfortable nighttime viewing
- 🔄 Automatic theme persistence
- 🎨 Smooth theme transitions

## 🔒 Security Features

- 🔐 Secure authentication via Supabase
- 🔒 Protected API routes
- 🛡️ XSS protection
- 🔑 Role-based access control

## 📊 Admin Dashboard Features

- 📈 Reservation statistics
- 👥 User management
- 🏷️ Table management
- 📊 Occupancy rates
- 📅 Calendar view
- 📉 Analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, please email support@reservease.com or open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Restaurant images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI inspiration from various restaurant booking systems

## 🚀 Roadmap

- [ ] Table layout visualization
- [ ] Waitlist management
- [ ] SMS notifications
- [ ] Special events booking
- [ ] Integration with POS systems
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app development