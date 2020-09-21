import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import client from '../utils/client';
import { useDispatchStore } from '../store';

interface IState {
  username?: string;
  password?: string;
  error?: string;
  loading?: boolean;
}

const IndexPage = () => {
  const [localState, setLocalState] = useState<IState>({
    username: '',
    password: '',
    loading: false,
    error: '',
  });

  const router = useRouter();
  const dispatch: any = useDispatchStore();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalState({ ...localState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    setLocalState({ ...localState, loading: true, error: '' });
    const { username, password } = localState;

    try {
      const rsp = await client({
        method: 'post',
        url: '/api/auth',
        data: {
          username,
          password,
        },
      });

      if (rsp.data.required2FA) {
        // An example on how we can set a global app state (in memory though!)
        dispatch({
          type: 'APP_STATE',
          payload: { twoFactorChallenge: rsp.data },
        });

        router.push('/SecondLogin');
      } else {
        router.push('/SplashPage');
      }

      setLocalState({ ...localState, loading: false });
    } catch (error) {
      const msg =
        error.response && error.response.data
          ? JSON.stringify(error.response.data, null, 2)
          : error.message;

      setLocalState({ ...localState, error: msg, loading: false });
    }
  };

  return (
    <Container className="md-container">
      <Form className="form-signin" onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Control
            placeholder="Enter username"
            name="username"
            autoComplete="off"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
        </Form.Group>

        {localState.error && (
          <Alert variant={'danger'}>{localState.error}</Alert>
        )}

        <Button
          disabled={localState.loading ? true : false}
          type="submit"
          name="submit"
          variant="primary"
          className="btn btn-lg btn-primary btn-block"
        >
          Sign in
          {localState.loading && (
            <Spinner animation="border" variant="primary" />
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default IndexPage;
