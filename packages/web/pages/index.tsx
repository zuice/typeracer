import { Container } from '../components/Container';
import { Race } from '../components/Race';

const Home = () => (
  <Container>
    <Race
      text="This is example text. Hopefully it works."
      players={[{ username: 'Frank', progress: 0 }]}
    />
  </Container>
);

export default Home;
