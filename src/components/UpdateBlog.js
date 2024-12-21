import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function UpdateBlog() {
  const { id } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch the existing blog details
  const fetchBlogDetails = () => {
    const token = localStorage.getItem('token');
    
    fetch(`https://blog-app-api-06de.onrender.com/blogs/viewBlog/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Add token if required
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBlog(data);
          setTitle(data.title);
          setContent(data.content);
          setLoading(false);
        } else {
          setError('Blog not found');
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Error fetching blog details');
        setLoading(false);
      });
  };

  // Update the blog details
  const updateBlog = (e) => {
    e.preventDefault();

    if (!title || !content) {
      notyf.error('Please fill in both title and content.');
      return;
    }

    setIsUpdating(true);

    const token = localStorage.getItem('token');
    fetch(`https://blog-app-api-06de.onrender.com/blogs/updateBlog/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((data) => {
      console.log(data)
        if (data) {
          notyf.success('Blog updated successfully');
          navigate(`/viewBlog/${id}`); // Redirect to the updated blog
        } else {
          notyf.error('Error updating blog');
        }
      })
      .catch(() => {
        notyf.error('Error updating blog');
      })
      .finally(() => {
        setIsUpdating(false);
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
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Update Form */}
      {blog && !loading && (
        <Form onSubmit={updateBlog}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate(`/viewBlog/${id}`)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
