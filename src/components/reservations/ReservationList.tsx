import React from 'react';
import { Calendar, Clock, Users, X } from 'lucide-react';
import type { Reservation } from '../../types';

interface ReservationListProps {
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations, onCancelReservation }) => {
  return (
    <div className="space-y-6">
      {reservations.map((reservation) => (
        <div
          key={reservation.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Reservation #{reservation.id.slice(0, 8)}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>{new Date(reservation.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{reservation.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <span>{reservation.partySize} {reservation.partySize === 1 ? 'person' : 'people'}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                    ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                </div>
              </div>
              {reservation.status !== 'cancelled' && (
                <button
                  onClick={() => onCancelReservation(reservation.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationList;