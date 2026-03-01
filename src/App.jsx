import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@context/AppContext';
import { RotaryHub } from './layouts/RotaryHub';
import { HomePage } from './pages/HomePage';
import { DataUploadPage } from './pages/DataUploadPage';
import { OptimizationPage } from './pages/OptimizationPage';
import { ReportsPage } from './pages/ReportsPage';
import { DiagnosticPage } from './pages/DiagnosticPage';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<RotaryHub />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/data" element={<DataUploadPage />} />
          <Route path="/optimize" element={<OptimizationPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route
            path="/settings"
            element={
              <div style={{ padding: '2rem', fontFamily: 'var(--font-body)' }}>
                <h1>Settings Page (Future)</h1>
              </div>
            }
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
