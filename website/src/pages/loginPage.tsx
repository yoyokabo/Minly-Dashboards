import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { useState } from "react";
import axios from "axios";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("api/users/login", {
        username,
        password,
      });
      console.log("API response:", response.data);
      setSuccess("Logged in successfully!");
      localStorage.setItem("token", response.data);
      setTimeout(function () {
        window.location.href = "/home";
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let message: string = error.request.response;
        message = message.substring(
          message.indexOf(":") + 2,
          message.length - 2,
        );
        setError(message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className={styles.formText} onSubmit={handleSubmit}>
      <Form.Group className={styles.formItems} controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group className={styles.formItems} controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        className={styles.formItems}
        variant="primary"
        type="submit"
        disabled={!(username && password)}
      >
        Submit
      </Button>
      {error && (
        <Alert variant="danger" className={styles.error}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className={styles.success}>
          {success}
        </Alert>
      )}
      {loading ? <Spinner animation="border" size="sm" /> : ""}
    </Form>
  );
};
