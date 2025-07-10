import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = ({ destination, checkin, checkout, guests }: any) => {
    navigate(
      `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    );
  };

  return (
    <div>
      <h2>Search Hotels</h2>
      <SearchBar onSubmit={handleSearchSubmit} />
    </div>
  );
}