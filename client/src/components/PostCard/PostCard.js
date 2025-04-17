import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { FaHeart, FaComment } from 'react-icons/fa';

const Card = styled.article`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
`;

const CardExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.lightText};
`;

const CardAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const CardStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const Stat = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PostCard = ({ post }) => {
  return (
    <Card>
      <Link to={`/post/${post._id}`}>
        <CardImage src={post.image || '/default-post.jpg'} alt={post.title} />
      </Link>
      <CardContent>
        <Link to={`/post/${post._id}`}>
          <CardTitle>{post.title}</CardTitle>
        </Link>
        <CardExcerpt>{post.content.substring(0, 150)}...</CardExcerpt>
        <CardMeta>
          <CardAuthor>
            <AuthorAvatar
              src={post.author.avatar || '/default-avatar.jpg'}
              alt={post.author.username}
            />
            {post.author.username}
          </CardAuthor>
          <CardStats>
            <Stat>
              <FaHeart /> {post.likesCount}
            </Stat>
            <Stat>
              <FaComment /> {post.commentsCount}
            </Stat>
          </CardStats>
        </CardMeta>
        <small>{formatDate(post.createdAt)}</small>
      </CardContent>
    </Card>
  );
};

export default PostCard;