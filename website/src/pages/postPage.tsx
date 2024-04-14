import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "../styles/Form.module.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface TokenData {
  _id: string;
  exp: number;
}

export const PostPage = () => {
  const [uploadfile, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    if (target.files[0].size < 26214400) {  // Limits file size to 25 MB
      setFile(target.files[0]);
      console.log(target.files[0]);
      if (target.files[0].type.split("/")[0] === "image") {
        setType("image");
      } else if (target.files[0].type.split("/")[0] === "video") {
        setType("video");
      } else {
        setError("Invalid File Type");
        setFile(null);
      }
    } else {
      setError("File larger that 25 MB");
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);

      const tokenonpost = localStorage.getItem("token");

      if (tokenonpost) {
        formData.append("token", tokenonpost);
        if (uploadfile) {
          formData.append("file", uploadfile);
          formData.append("type", type);
          console.log(uploadfile);
          const response = await axios.post("api/posts", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });
          console.log(response);
          setSuccess("Posted Successfully!");
          setError(null);
        }
      }
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
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode<TokenData>(token);
    const expires = decoded.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime < Number(expires)) {
      return (
        <Form className={styles.formText} onSubmit={handleSubmit}>
          <Form.Group className={styles.formItems} controlId="formMedia">
            <Form.Label>Upload an Image or Video</Form.Label>
            <Form.Control
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Form.Group className={styles.formItems} controlId="formCaption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </Form.Group>
          <Button
            className={styles.formItems}
            variant="primary"
            type="submit"
            disabled={!(caption && uploadfile)}
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
    }
  }

  return (
    <Alert variant="danger" className={styles.error}>
      "Please Login First"
    </Alert>
  );
};
