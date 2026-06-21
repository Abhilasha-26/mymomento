// Imports
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import SearchWrapper from './SearchWrapper';
import { getOrdersByEvent } from '@/lib/actions/order.actions';
import { getEventById } from '@/lib/actions/event.actions';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { IOrderItem } from '@/lib/database/models/order.model';

// Type
type SearchParamProps = {
  searchParams?: Promise<{
    eventId?: string;
    query?: string;
  }>;
};

// Component
const Orders = async ({ searchParams }: SearchParamProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/sign-in');
  const params = await searchParams;

  const eventId = params?.eventId || '';
  const searchText = params?.query || '';
  if (!eventId) redirect('/profile');
  const event = await getEventById(eventId);
  if (!event) redirect('/profile');

  if (event.organizer._id.toString() !== currentUser.userId) {
    redirect('/profile');
  }
  const orders = await getOrdersByEvent({
    eventId,
    searchString: searchText,
  });

  const orderCount = orders?.length || 0;
  const totalRevenue =
    orders?.reduce((sum: number, row: IOrderItem) => sum + parseFloat(row.totalAmount || '0'), 0) || 0;

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Page Title / Stats */}
      <section className="relative px-6 md:px-16 pt-32 pb-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
            {event.title}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-3 mb-8">
            Orders
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-w-md">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-semibold text-orange-500">
                {String(orderCount).padStart(2, '0')}
              </p>
              <p className="text-sm text-zinc-400 mt-1">Total orders</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-mono text-3xl font-semibold text-orange-500">
                {formatPrice(String(totalRevenue))}
              </p>
              <p className="text-sm text-zinc-400 mt-1">Total revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <SearchWrapper />
        </div>
      </section>

      {/* Orders Table */}
      <section className="px-6 md:px-16 mt-8 mb-20 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="min-w-[140px] py-4 px-6 text-left font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase">
                      Order ID
                    </th>
                    <th className="min-w-[200px] py-4 px-6 text-left font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase">
                      Event
                    </th>
                    <th className="min-w-[150px] py-4 px-6 text-left font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase">
                      Buyer
                    </th>
                    <th className="min-w-[140px] py-4 px-6 text-left font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase">
                      Purchased
                    </th>
                    <th className="min-w-[100px] py-4 px-6 text-right font-mono text-xs text-zinc-500 tracking-[0.1em] uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders && orders.length > 0 ? (
                    orders.map((row: IOrderItem) => (
                      <tr
                        key={row._id}
                        className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors duration-150"
                      >
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs text-orange-500 bg-orange-500/10 rounded-md px-2 py-1">
                            #{row._id.slice(-6).toUpperCase()}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-sm text-zinc-200">
                          {row.eventTitle}
                        </td>

                        <td className="py-4 px-6 text-sm text-zinc-200">
                          {row.buyer}
                        </td>

                        <td className="py-4 px-6 text-sm text-zinc-500">
                          {formatDateTime(row.createdAt).dateTime}
                        </td>

                        <td className="py-4 px-6 text-right text-sm font-medium text-white">
                          {formatPrice(row.totalAmount)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-16 text-center">
                        <p className="text-zinc-500 text-sm">
                          No orders yet for this event.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Orders;