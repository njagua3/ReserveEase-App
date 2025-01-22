import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Clock, Users, Calendar, Star, Shield, Phone } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SearchForm from './components/SearchForm';
import AuthForm from './components/auth/AuthForm';
import TableList from './components/tables/TableList';
import ReservationList from './components/reservations/ReservationList';
import AdminDashboard from './components/admin/AdminDashboard';
import BookingModal from './components/tables/BookingModal';

// Move mock data to a protected context
const mockData = {
  tables: [
    { id: '1', tableNumber: 1, capacity: 2, isAvailable: true },
    { id: '2', tableNumber: 2, capacity: 4, isAvailable: true },
    { id: '3', tableNumber: 3, capacity: 6, isAvailable: true },
    { id: '4', tableNumber: 4, capacity: 8, isAvailable: true },
    { id: '5', tableNumber: 5, capacity: 2, isAvailable: true },
    { id: '6', tableNumber: 6, capacity: 4, isAvailable: false },
    { id: '7', tableNumber: 7, capacity: 6, isAvailable: true },
    { id: '8', tableNumber: 8, capacity: 8, isAvailable: true },
    { id: '9', tableNumber: 9, capacity: 2, isAvailable: true },
    { id: '10', tableNumber: 10, capacity: 4, isAvailable: true },
    { id: '11', tableNumber: 11, capacity: 6, isAvailable: false },
    { id: '12', tableNumber: 12, capacity: 8, isAvailable: true }
  ],
  reservations: [
    { id: '1', userId: 'user-1', tableId: '1', date: '2024-01-20', time: '19:00', partySize: 2, status: 'confirmed' as const },
    { id: '2', userId: 'user-1', tableId: '2', date: '2024-01-21', time: '20:00', partySize: 4, status: 'pending' as const },
    { id: '3', userId: 'user-2', tableId: '3', date: '2024-01-22', time: '18:30', partySize: 6, status: 'confirmed' as const },
    { id: '4', userId: 'user-3', tableId: '4', date: '2024-01-23', time: '19:30', partySize: 8, status: 'cancelled' as const },
    { id: '5', userId: 'user-1', tableId: '5', date: '2024-01-24', time: '20:30', partySize: 2, status: 'confirmed' as const },
    { id: '6', userId: 'user-2', tableId: '7', date: '2024-01-25', time: '18:00', partySize: 6, status: 'confirmed' as const },
    { id: '7', userId: 'user-3', tableId: '8', date: '2024-01-26', time: '19:00', partySize: 8, status: 'pending' as const },
    { id: '8', userId: 'user-1', tableId: '10', date: '2024-01-27', time: '20:00', partySize: 4, status: 'confirmed' as const }
  ],
  stats: {
    totalReservations: 150,
    activeReservations: 45,
    averagePartySize: 3.5,
    totalTables: 12,
    occupancyRate: 75,
    popularTimes: ['19:00', '20:00', '18:30'],
    weeklyBookings: 89,
    monthlyBookings: 342
  }
};

// Protected route component for any authenticated user
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('userRole') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Protected admin route component
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [selectedTable, setSelectedTable] = useState<null | typeof mockData.tables[0]>(null);
  const [searchParams, setSearchParams] = useState({
    date: '',
    time: '',
    partySize: 2
  });
  const [filteredTables, setFilteredTables] = useState(mockData.tables);
  const isAuthenticated = localStorage.getItem('userRole') !== null;

  const handleSearch = (date: string, time: string, partySize: number) => {
    setSearchParams({ date, time, partySize });
    
    // Filter tables based on party size and availability
    const filtered = mockData.tables.filter(table => 
      table.isAvailable && 
      table.capacity >= partySize && 
      table.capacity <= partySize + 2 // Don't show tables that are too large
    );
    
    setFilteredTables(filtered);
  };

  const handleAuth = (data: { email: string; password: string; name?: string }) => {
    // Mock authentication logic
    if (data.email === 'admin@reservease.com' && data.password === 'Admin123!') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userId', 'admin-1');
      return true;
    } else if (data.email === 'user@reservease.com' && data.password === 'User123!') {
      localStorage.setItem('userRole', 'user');
      localStorage.setItem('userId', 'user-1');
      return true;
    }
    return false;
  };

  const handleBookTable = (tableId: string) => {
    if (!isAuthenticated) {
      alert('Please log in to book a table');
      return;
    }

    const table = mockData.tables.find(t => t.id === tableId);
    if (table) {
      setSelectedTable(table);
    }
  };

  const handleConfirmBooking = () => {
    if (!isAuthenticated) {
      alert('Please log in to confirm your booking');
      return;
    }

    if (selectedTable) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Authentication error. Please log in again.');
        return;
      }

      // Create a new reservation
      const newReservation = {
        id: String(mockData.reservations.length + 1),
        userId,
        tableId: selectedTable.id,
        date: searchParams.date,
        time: searchParams.time,
        partySize: searchParams.partySize,
        status: 'confirmed' as const
      };

      // Add to mock reservations
      mockData.reservations.push(newReservation);

      // Close modal and reset selection
      setSelectedTable(null);

      alert('Booking confirmed! Check your email for details.');
    }
  };

  const handleCancelReservation = (id: string) => {
    const userId = localStorage.getItem('userId');
    const reservation = mockData.reservations.find(r => r.id === id);
    
    if (!reservation) {
      alert('Reservation not found');
      return;
    }

    if (reservation.userId !== userId) {
      alert('You can only cancel your own reservations');
      return;
    }

    // Update reservation status
    reservation.status = 'cancelled' as const;
  };

  // Filter reservations for the current user
  const userReservations = mockData.reservations.filter(
    reservation => reservation.userId === localStorage.getItem('userId')
  );

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-12 sm:space-y-16">
                    {/* Hero Section */}
<div className="relative min-h-screen sm:min-h-[400px] lg:min-h-screen">
  <div className="absolute inset-0">
    <img
      className="w-full h-full object-cover"
      src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
      alt="Restaurant interior"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
  </div>
  <div className="relative max-w-4xl mx-auto text-center py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
      Dining Made Simple
    </h1>
    <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto">
      ReserveEase transforms your dining experience with seamless table reservations.
    </p>
  </div>
</div>


{/* Search Section */}
<div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 relative z-10">
  <div className="text-center mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
      Find Your Table
    </h2>
    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
      Book your perfect dining experience in seconds
    </p>
  </div>
  <SearchForm onSearch={handleSearch} />
</div>


                    {/* Features Section */}
                    <div className="py-12 sm:py-16 bg-white dark:bg-gray-800">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            Why Choose ReserveEase?
                          </h2>
                          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                            Experience the future of restaurant reservations
                          </p>
                        </div>

                        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          {/* Feature cards */}
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative p-4 sm:p-6 bg-white dark:bg-gray-700 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-4 sm:space-x-6">
                              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                              <div className="space-y-2">
                                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                  Real-Time Availability
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  See available tables instantly and book with confidence
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative p-4 sm:p-6 bg-white dark:bg-gray-700 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-4 sm:space-x-6">
                              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                              <div className="space-y-2">
                                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                  Instant Confirmation
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  Receive immediate booking confirmations and reminders
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                            <div className="relative p-4 sm:p-6 bg-white dark:bg-gray-700 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-4 sm:space-x-6">
                              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                              <div className="space-y-2">
                                <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                                  Secure Booking
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                  Your reservations are protected and guaranteed
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Available Tables Section */}
                    <div className="py-12 sm:py-16">
                      <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                          Available Tables
                        </h2>
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                          {isAuthenticated ? 
                            'Select your preferred table to make a reservation' :
                            'Please log in to make a reservation'}
                        </p>
                      </div>
                      <TableList 
                        tables={filteredTables} 
                        onBookTable={handleBookTable}
                      />
                      {selectedTable && (
                        <BookingModal
                          table={selectedTable}
                          date={searchParams.date}
                          time={searchParams.time}
                          partySize={searchParams.partySize}
                          isOpen={selectedTable !== null}
                          onClose={() => setSelectedTable(null)}
                          onConfirm={handleConfirmBooking}
                        />
                      )}
                    </div>

                    {/* Testimonials Section */}
                    <div className="bg-white dark:bg-gray-800 py-12 sm:py-16">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                            What Our Customers Say
                          </h2>
                          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
                            Join thousands of satisfied diners
                          </p>
                        </div>
                        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                              "ReserveEase made booking our anniversary dinner so simple. No more waiting on hold or hoping for a callback!"
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">- Sarah M.</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                              "As a restaurant owner, this system has streamlined our booking process and reduced no-shows significantly."
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">- Michael R.</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                              "The real-time availability feature is a game-changer. I can always find the perfect table for my business meetings."
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">- David L.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
              <Route
                path="/login"
                element={<AuthForm type="login" onSubmit={handleAuth} />}
              />
              <Route
                path="/register"
                element={<AuthForm type="register" onSubmit={handleAuth} />}
              />
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <div className="px-4 py-6 sm:px-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        My Reservations
                      </h2>
                      <ReservationList
                        reservations={userReservations}
                        onCancelReservation={handleCancelReservation}
                      />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <div className="px-4 py-6 sm:px-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Admin Dashboard
                      </h2>
                      <AdminDashboard
                        reservations={mockData.reservations}
                        stats={mockData.stats}
                      />
                    </div>
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;