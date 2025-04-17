import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Tag = styled.button`
  background: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.background};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const TagFilter = ({ tags }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');

  const handleTagClick = (tag) => {
    if (currentTag === tag) {
      searchParams.delete('tag');
    } else {
      searchParams.set('tag', tag);
    }
    setSearchParams(searchParams);
  };

  return (
    <TagContainer>
      {tags.map(tag => (
        <Tag
          key={tag}
          active={currentTag === tag}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  );
};

export default TagFilter;