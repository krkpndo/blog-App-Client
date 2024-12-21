import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container,Table, Col, Card, Button, Spinner } from 'react-bootstrap';


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
        <Container>
            <h1 className='text-center mt-5'>Blog Posts</h1>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td>{blog.title}</td>
                            <td>{blog.content}</td>
                            <td>{blog.author}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    as={Link}
                                    to={`/deleteBlog/${blog._id}`}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
