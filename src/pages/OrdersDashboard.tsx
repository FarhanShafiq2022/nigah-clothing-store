import React from 'react';
import { ArrowRight, Package, ShoppingBag } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../hooks/useAuth';

export const OrdersDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { navigate } = useNavigation();

  if (isLoading) return null;

  if (!user) {
    return (
      <section className="min-h-[70vh] pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-lg text-center border border-[#262626] bg-[#0E0E0E] p-8 sm:p-12">
          <Package className="w-10 h-10 mx-auto mb-5 text-[#C9A24D]" />
          <h1 className="font-serif text-3xl text-[#F5F2EA]">Sign in to view orders</h1>
          <p className="mt-3 text-sm text-[#888]">Your Google account is required to access your order history.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] pt-32 pb-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-[#222] pb-6">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase">Client Dashboard</span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#F5F2EA]">My Orders</h1>
          <p className="mt-2 text-sm text-[#888]">A private view of orders placed with {user.email}.</p>
        </div>
        <div className="border border-[#262626] bg-[#0E0E0E] p-8 sm:p-12 text-center">
          <ShoppingBag className="w-10 h-10 mx-auto mb-5 text-[#C9A24D] stroke-1" />
          <h2 className="font-serif text-2xl text-[#F5F2EA]">No orders yet</h2>
          <p className="mt-2 text-sm text-[#888] max-w-md mx-auto">Your confirmed atelier purchases will appear here once checkout is connected.</p>
          <button onClick={() => navigate('/shop')} className="mt-7 inline-flex items-center gap-3 px-6 py-3 bg-[#C9A24D] text-[#0A0A0A] text-xs tracking-[0.2em] uppercase font-medium cursor-pointer">
            Browse Collection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};