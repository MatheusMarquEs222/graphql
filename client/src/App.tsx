import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { ScheduleList } from './components/ScheduleList';
import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="p-6">
        <Routes>
          {/* <Route path='clients' element={ <ClientList /> } /> */}
          <Route path='schedules' element={ <ScheduleList/> } />
          {/* <Route path='products' element={ <ProductsList />} /> */}
        </Routes>
      </main>
    </Router>
    
  );
}

export default App;
