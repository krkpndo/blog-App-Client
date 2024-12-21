import { useState, useContext } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddBlog({ fetchData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notyf = new Notyf();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);


  // Input states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createProduct = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch('https://blog-app-api-06de.onrender.com/blogs/addPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title,
        content
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data) {
          setTitle('');
          setContent('');
          notyf.success('Blog Added');
          handleClose();

          // Refresh data after adding
          if (fetchData) fetchData();
        } else {
          notyf.error('Error: Something Went Wrong.');
        }
      })
      .catch((err) => {
        console.error(err);
        notyf.error('Error: Unable to Add Blog.');
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <Button className="bg-dark" variant="primary" onClick={handleShow}>
          Add New Blog
        </Button>
      </div>

      <Modal className="mx-auto" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Content:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit">
                Post
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
