import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate(); // Importe useNavigate corretamente

  // Validação com Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  // Formik useFormik hook para gerenciar o formulário
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Simulando login bem-sucedido
      if (values.email === 'usuario@email.com' && values.password === 'senha123') {
        // Redirecionando para a página Home após login válido
        navigate('/home'); // Utilize navigate para navegar para '/home'
      } else {
        alert('Credenciais inválidas');
      }
    },
  });

  return (
    <Container maxWidth="xs" style={{ marginTop: '5em' }}>
      <Paper elevation={3} style={{ padding: '2em' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Senha"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Entrar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Não tem uma conta?{' '}
                <Link href="#" onClick={() => alert('Ir para página de cadastro')}>
                  Cadastre-se aqui
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
