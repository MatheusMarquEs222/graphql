import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/layout/Navbar';
import { ScheduleList } from './pages/shedules/ScheduleList';
import { ClientsList } from './pages/clients/ClientsList';
import { ProductList } from './pages/products/ProductsList';
import { ScheduleHistoryList } from './pages/scheduleHistory/ScheduleHistoryList';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path='clients' element={ <ClientsList /> } />
          <Route path='schedules' element={ <ScheduleList/> } />
          <Route path='scheduleHistories' element={ <ScheduleHistoryList /> } />
          <Route path='products' element={ <ProductList />} />
        </Routes>
      </main>
    </Router>
    
  );
}

export default App;
