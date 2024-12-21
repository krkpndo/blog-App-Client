import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Container className="text-center" style={{ marginTop: '100px' }}>
        <h1>Welcome to our Zuitt BlogAPP</h1>
        {/* Button targets the Movies page */}
        <Button variant="primary" size="lg" as={Link} to="https://blog-app-api-06de.onrender.com/blogs/getAllBlogs">
          View our Blogs
        </Button>
      </Container>
    </>
  );
}
