import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import AddBlog from './AddBlog'; // Import AddBlog component

export default function GetBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    let fetchUrl = "https://blog-app-api-06de.onrender.com/blogs/getAllBlogs";

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Send token only if it exists
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBlogs(data);
          setLoading(false);
        } else {
          setError("No blogs found.");
          setLoading(false);
        }
      })
      .catch((error) => {
        setError("Error fetching blogs.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="header-section d-flex justify-content-between align-items-center">
        <h1>Blog Posts</h1>
        {/* Add Blog Button only for logged-in users */}
        {localStorage.getItem('token') && (
          <AddBlog fetchData={fetchData} /> // Embed AddBlog and pass fetchData
        )}
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
          {blogs.length > 0 ? (
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
                    <Button
                      variant="primary"
                      size="lg"
                      as={Link}
                      to={`/viewBlog/${blog._id}`} // Blog details page
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="no-blogs">No blogs found</p>
          )}
        </Row>
      </Container>
    </>
  );
}
