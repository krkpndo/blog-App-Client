import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

export default function BlogDetails() {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog details
  const fetchBlogDetails = () => {
    fetch(`https://blog-app-api-06de.onrender.com/blogs/viewBlog/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Add token if required
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setBlog(data);
          setLoading(false);
        } else {
          setError("Blog not found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching blog details.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <Container className="mt-5">
      {/* Loading State */}
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status" variant="primary" />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Blog Details */}
      {blog && (
        <Card className="shadow-lg">
          <Card.Img
            variant="top"
            src={blog.image || "https://www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png"}
            alt={blog.title}
          />
          <Card.Body>
            <Card.Title className="mb-4">{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
