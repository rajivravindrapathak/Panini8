import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MarkdownEditor from '../components/MarkdownEditor';
import TagInput from '../components/TagInput';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title is too long'),
  content: Yup.string()
    .required('Content is required'),
  tags: Yup.array()
    .of(Yup.string().max(20, 'Tag is too long'))
    .max(5, 'Maximum 5 tags allowed')
});

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const postData = {
        ...values,
        tags: values.tags.join(',')
      };
      const res = await API.post('/posts', postData);
      navigate(`/post/${res.data._id}`);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return <div>Please login to create a post</div>;
  }

  return (
    <Container>
      <h1>Create New Post</h1>
      <Formik
        initialValues={{ title: '', content: '', tags: [] }}
        validationSchema={PostSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="title">Title</label>
              <Field type="text" name="title" placeholder="Post title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <button type="button" onClick={() => setPreview(!preview)}>
                {preview ? 'Edit' : 'Preview'}
              </button>
              
              {preview ? (
                <div>
                  <h2>{values.title}</h2>
                  <MarkdownEditor content={values.content} readOnly />
                </div>
              ) : (
                <Field name="content">
                  {({ field }) => (
                    <MarkdownEditor
                      value={field.value}
                      onChange={(value) => setFieldValue('content', value)}
                    />
                  )}
                </Field>
              )}
              <ErrorMessage name="content" component="div" />
            </div>

            <div>
              <label>Tags</label>
              <TagInput
                tags={values.tags}
                onAddTag={(tag) => {
                  if (!values.tags.includes(tag)) {
                    setFieldValue('tags', [...values.tags, tag]);
                  }
                }}
                onRemoveTag={(tag) => {
                  setFieldValue('tags', values.tags.filter(t => t !== tag));
                }}
              />
              <ErrorMessage name="tags" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CreatePost;