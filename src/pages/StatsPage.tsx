import { useParams } from 'react-router';

export default function StatsPage() {
  const { period } = useParams();
  return <h1>{period}</h1>;
}
