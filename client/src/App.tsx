import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { ScheduleList } from './pages/shedules/ScheduleList';
import { ClientsList } from './pages/clients/ClientsList';
import { ProductList } from './pages/products/ProductsList';
import { ScheduleHistoryList } from './pages/scheduleHistory/ScheduleHistoryList';
import { ClientForm } from './pages/clients/ClientForm';
import { ProductForm } from './pages/products/ProductForm';
import { SaleForm } from './pages/sales/SaleForm';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-[#f4f1eb] p-6">
          <Routes>
            <Route path="/clients/all" element={<ClientsList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/schedules/all" element={<ScheduleList />} />
            <Route path="/scheduleHistories" element={<ScheduleHistoryList />} />
            <Route path="/sales/new" element={<SaleForm />} />
            <Route path="/products/all" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
