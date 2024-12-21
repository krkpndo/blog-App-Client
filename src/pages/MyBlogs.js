import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's blogs
  const fetchUserBlogs = () => {
    const token = localStorage.getItem('token');

    fetch("http://localhost:4000/blogs/getMyBlogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setBlogs(data);
          setLoading(false);
        } else {
          setError("You have no blogs yet.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching your blogs.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="header-section">
        <h1>My Blogs</h1>
      </div>

      {/* Blogs List */}
      <Container className="card-container text-center">
        {/* Loading State */}
        {loading && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" role="status" variant="primary" />
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="no-blogs">{error}</p>}

        {/* Blogs Grid */}
        <Row className="justify-content-center">
          {blogs.length > 0 &&
            blogs.map((blog, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                <Card className="mb-4 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={blog.image || "https://www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png"}
                    alt={blog.title}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title className="card-title">{blog.title}</Card.Title>
                    <Card.Text className="card-text">
                      {blog.content.substring(0, 100)}... {/* Preview content */}
                    </Card.Text>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/viewBlog/${blog._id}`} // Link to blog details page
                    >
                      Details
                    </Button>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/updateBlog/${blog._id}`} // Link to blog update page
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      as={Link}
                      to={`/deleteBlog/${blog._id}`} // Link to blog delete page
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}
