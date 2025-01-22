import React from 'react';
import { Clock, Users } from 'lucide-react';
import type { Table } from '../../types';

interface TableListProps {
  tables: Table[];
  onBookTable: (tableId: string) => void;
}

const TableList: React.FC<TableListProps> = ({ tables, onBookTable }) => {
  // Array of dining room and restaurant table images
  const roomImages = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tables.map((table, index) => (
        <div
          key={table.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 bg-cover bg-center"
               style={{ backgroundImage: `url(${roomImages[index % roomImages.length]})` }}>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Table {table.tableNumber}
            </h3>
            <div className="flex items-center text-gray-600 mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span>Accommodates up to {table.capacity} guests</span>
            </div>
            <div className="flex items-center text-gray-600 mb-6">
              <Clock className="h-5 w-5 mr-2" />
              <span>Available for booking</span>
            </div>
            <button
              onClick={() => onBookTable(table.id)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Book This Table
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableList;