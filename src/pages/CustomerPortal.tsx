import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerPortal = () => {
  const { phone } = useParams<{ phone: string }>();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Customer Portal</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Welcome to the customer portal for phone: {phone}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This page is under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;