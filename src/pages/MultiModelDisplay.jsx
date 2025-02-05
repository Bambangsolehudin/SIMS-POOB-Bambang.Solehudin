import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import ReactPlayer from 'react-player';
import Layout from '../components/Layout';

// Data untuk Chart.js (dummy data)
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
  ],
};

const MultiModelDisplay = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulasi delay 2 detik
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <Layout>
      <div className="multi-model-display">
        <h2>Multi-Model Display</h2>

        {/* Tampilkan Grafik (Chart.js) */}
        <div className="chart-container">
          <h3>Revenue Chart</h3>
          <Line data={chartData} />
        </div>

        {/* Tampilkan Teks */}
        <div className="text-container">
          <h3>Sample Text</h3>
          <p>This is an example of displaying rich text along with other models.</p>
        </div>

        {/* Tampilkan Gambar */}
        <div className="image-container">
          <h3>Image Gallery</h3>
          <img src="https://bams-portfolio.netlify.app/template/assets/img/profile.jpg" alt="Placeholder" />
        </div>

        {/* Tampilkan Video */}
        <div className="video-container">
          <h3>Video Example</h3>
          <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </div>
      </div>
    </Layout>
  );
};

export default MultiModelDisplay;
