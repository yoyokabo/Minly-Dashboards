import { Col, Container, Row } from "react-bootstrap";
import  { useEffect, useState } from "react";
import { Post as PostModel } from "../models/post";
import Post from "../components/Post";
import styles from "../styles/PostsPage.module.css";

export const HomePage = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch("/api/posts", { method: "GET" });
        console.log("running");
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    }
    loadPosts();
  }, []);

  return (
    <Container>
      <Row xs={1} md={1} xl={1} className="g-5">
        {posts.map((post) => (
          <Col key={post._id}>
            <Post post={post} className={styles.post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
