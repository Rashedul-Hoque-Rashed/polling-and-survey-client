import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useContext } from 'react';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const defaultTheme = createTheme();

const category = [
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Business',
    label: 'Business',
  },
  {
    value: 'Social Issues',
    label: 'Social Issues',
  },
  {
    value: 'Market Research',
    label: 'Market Research',
  },
  {
    value: 'Political',
    label: 'Political',
  },
  {
    value: 'Event Feedback',
    label: 'Event Feedback',
  },
  {
    value: 'Education',
    label: 'Education',
  },
  {
    value: 'Health and Wellness',
    label: 'Health and Wellness',
  },
  {
    value: 'Travel and Tourism',
    label: 'Travel and Tourism',
  },
  {
    value: 'Employee Engagement',
    label: 'Employee Engagement',
  },
];

const surveySchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  deadline: Yup.date().required('Deadline is required').min(new Date(), 'Deadline must be in the future'),
});

const CreateSurvey = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      description: '',
      deadline: '',
    },
    validationSchema: surveySchema,
    onSubmit: async (values) => {
      const surveyInfo = {
        title: values.title,
        description: values.description,
        status: 'pending',
        likes: 0,
        dislikes: 0,
        options: {
          yes: 0,
          no: 0,
        },
        name: user?.displayName,
        email: user?.email,
        category: values.category,
        timestamp: new Date(),
        deadline: new Date(values.deadline),
      };

      const addSurvey = await axios.post('/surveys', surveyInfo);

      if (addSurvey.data.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${values.title} added successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        formik.resetForm();
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 12, mb: 16 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create a Survey
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              type="text"
              label="Add Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? <div style={{color: 'red'}}>{formik.errors.title}</div> : null}

            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              id="outlined-select"
              select
              label="Select Your Category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              {category.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {formik.touched.category && formik.errors.category ? <div style={{color: 'red'}}>{formik.errors.category}</div> : null}

            <TextField
              id="outlined-multiline-static"
              label="Description"
              margin="normal"
              name="description"
              required
              fullWidth
              multiline
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? <div style={{color: 'red'}}>{formik.errors.description}</div> : null}

            <TextField
              margin="normal"
              required
              fullWidth
              id="deadline"
              type="date"
              label="Add Deadline"
              name="deadline"
              autoComplete="title"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deadline}
            />
            {formik.touched.deadline && formik.errors.deadline ? <div style={{color: 'red'}}>{formik.errors.deadline}</div> : null}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Add Survey
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateSurvey;
