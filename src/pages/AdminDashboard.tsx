import React from 'react';
import { BarChart3, ClipboardList, Package, ShieldCheck, ShoppingBag, Users, type LucideIcon } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';

type AdminSection = 'overview' | 'products' | 'orders';

interface AdminDashboardProps {
  section: AdminSection;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ section }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const { allProducts } = useProducts();
  const { navigate } = useNavigation();

  if (isLoading) return null;

  if (!user || !isAdmin) {
    return (
      <section className="min-h-[70vh] pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-lg text-center border border-[#6b2525] bg-[#160d0d] p-8 sm:p-12">
          <ShieldCheck className="w-10 h-10 mx-auto mb-5 text-[#C9A24D]" />
          <h1 className="font-serif text-3xl text-[#F5F2EA]">Admin access required</h1>
          <p className="mt-3 text-sm text-[#888]">This area is restricted to the authorized store administrator.</p>
          <button onClick={() => navigate('/')} className="mt-7 px-6 py-3 border border-[#C9A24D] text-[#C9A24D] text-xs tracking-[0.2em] uppercase cursor-pointer">Return Home</button>
        </div>
      </section>
    );
  }

  const inStock = allProducts.filter((product) => product.inStock).length;
  const categories = new Set(allProducts.map((product) => product.category)).size;
  const tabs: { label: string; route: '/admin' | '/admin/products' | '/admin/orders'; icon: React.ReactNode }[] = [
    { label: 'Overview', route: '/admin', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Products', route: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { label: 'Orders', route: '/admin/orders', icon: <ClipboardList className="w-4 h-4" /> }
  ];
  const metrics: { label: string; value: number; icon: LucideIcon }[] = [
    { label: 'Catalog Pieces', value: allProducts.length, icon: Package },
    { label: 'In Stock', value: inStock, icon: ShoppingBag },
    { label: 'Categories', value: categories, icon: BarChart3 },
    { label: 'Customer Orders', value: 0, icon: Users }
  ];

  return (
    <section className="min-h-[70vh] pt-32 pb-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 border-b border-[#222] pb-6 mb-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase">Store Administration</span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl text-[#F5F2EA]">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-[#888]">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#C9A24D]"><ShieldCheck className="w-4 h-4" /> Authorized</div>
        </div>

        <nav className="flex flex-wrap gap-2 mb-8" aria-label="Admin dashboard">
          {tabs.map((tab) => (
            <button key={tab.route} onClick={() => navigate(tab.route)} className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs tracking-[0.16em] uppercase cursor-pointer ${section === tab.label.toLowerCase() ? 'border-[#C9A24D] bg-[#C9A24D]/10 text-[#E0C27A]' : 'border-[#262626] text-[#888] hover:border-[#C9A24D]/60 hover:text-[#F5F2EA]'}`}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </nav>

        {section === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {metrics.map(({ label, value, icon: MetricIcon }) => (
              <div key={label} className="border border-[#262626] bg-[#0E0E0E] p-6">
                <MetricIcon className="w-5 h-5 text-[#C9A24D] mb-6" />
                <div className="font-serif text-3xl text-[#F5F2EA]">{value}</div>
                <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#888]">{label}</div>
              </div>
            ))}
          </div>
        )}

        {section === 'products' && (
          <div className="border border-[#262626] bg-[#0E0E0E] overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#222] flex items-center justify-between"><h2 className="font-serif text-2xl text-[#F5F2EA]">Product Catalog</h2><span className="text-xs text-[#888]">{allProducts.length} pieces</span></div>
            <div className="divide-y divide-[#222]">
              {allProducts.map((product) => <div key={product.id} className="p-4 sm:p-5 flex items-center gap-4"><img src={product.image} alt={product.name} className="w-12 h-16 object-cover object-top bg-[#161616]" /><div className="min-w-0 flex-1"><div className="text-sm text-[#F5F2EA] truncate">{product.name}</div><div className="mt-1 text-[10px] tracking-wider uppercase text-[#888]">{product.category}</div></div><div className="text-xs text-[#E0C27A]">Rs. {product.price.toLocaleString()}</div></div>)}
            </div>
          </div>
        )}

        {section === 'orders' && <div className="border border-[#262626] bg-[#0E0E0E] p-8 sm:p-12 text-center"><ClipboardList className="w-10 h-10 mx-auto mb-5 text-[#C9A24D] stroke-1" /><h2 className="font-serif text-2xl text-[#F5F2EA]">Order management is ready</h2><p className="mt-2 text-sm text-[#888]">Orders will appear here after checkout is connected to Firestore.</p></div>}
      </div>
    </section>
  );
};