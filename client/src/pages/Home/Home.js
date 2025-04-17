import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <HomeContainer>
      <h1>Recent Posts</h1>
      <PostsGrid>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostsGrid>
    </HomeContainer>
  );
};

export default Home;