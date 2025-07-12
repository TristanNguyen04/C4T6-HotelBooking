import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import Hero from '../components/Hero';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = ({ destination, checkin, checkout, guests }: any) => {
    navigate(
      `/search?term=${encodeURIComponent(destination.term)}&destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&guests=${guests}`
    );
  };

  return (
    <>
      <Hero/>
      <SearchBar onSubmit={handleSearchSubmit} />
    </>
  );
}