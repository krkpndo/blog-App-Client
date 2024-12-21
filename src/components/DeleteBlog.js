import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function DeleteBlog() {
  const { id } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();
  const notyf = new Notyf();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete the blog directly
  const deleteBlog = () => {
    const token = localStorage.getItem('token');
    setLoading(true);

    fetch(`https://blog-app-api-06de.onrender.com/blogs/deleteBlog/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          notyf.success('Blog deleted successfully');
          navigate('/'); // Redirect to homepage or blog list after deletion
        } else {
          notyf.error('Error deleting blog');
        }
      })
      .catch(() => {
        notyf.error('Error deleting blog');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container className="mt-5 text-center">
      {/* Loading State */}
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status" variant="primary" />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Delete Confirmation */}
      {!loading && !error && (
        <div>
          <h3>Are you sure you want to delete this blog?</h3>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="danger" onClick={deleteBlog} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button variant="secondary" className="ml-3" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
