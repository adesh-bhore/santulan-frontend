import { useState, useEffect } from 'react';
import api from '../services/api';

export const DiagnosticPage = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getDashboardSummary();
      console.log('Raw API Response:', result);
      setResponse(result);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Dashboard API Diagnostic</h1>
      
      <button onClick={testAPI} disabled={loading}>
        {loading ? 'Loading...' : 'Test API'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response Structure:</h2>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(response, null, 2)}
          </pre>

          <h2>Data Checks:</h2>
          <ul>
            <li>Has success: {response.success ? '✅' : '❌'}</li>
            <li>Has fleet_metrics: {response.fleet_metrics ? '✅' : '❌'} (length: {response.fleet_metrics?.length || 0})</li>
            <li>Has status_breakdown: {response.status_breakdown ? '✅' : '❌'} (length: {response.status_breakdown?.length || 0})</li>
            <li>Has todays_summary: {response.todays_summary ? '✅' : '❌'}</li>
            <li>Has depots: {response.depots ? '✅' : '❌'} (length: {response.depots?.length || 0})</li>
          </ul>

          {response.fleet_metrics && response.fleet_metrics.length > 0 && (
            <div>
              <h3>Sample Fleet Metric:</h3>
              <pre style={{ background: '#e8f5e9', padding: '10px' }}>
                {JSON.stringify(response.fleet_metrics[0], null, 2)}
              </pre>
            </div>
          )}

          {response.depots && response.depots.length > 0 && (
            <div>
              <h3>Sample Depot:</h3>
              <pre style={{ background: '#e3f2fd', padding: '10px' }}>
                {JSON.stringify(response.depots[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
