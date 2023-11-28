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





const defaultTheme = createTheme();


const currencies = [
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
  }
];



const CreateSurvey = () => {

  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    const surveyInfo = {
      title: title,
      description: description,
      status: 'pending',
      likes: 0,
      dislikes: 0,
      options: {
        yes: 0,
        no: 0
      },
      name: user?.displayName,
      email: user?.email,
      category: category,
      timestamp: new Date()
    }
    const addSurvey = await axios.post('/surveys', surveyInfo)
    if (addSurvey.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${title} added successfully.`,
        showConfirmButton: false,
        timer: 1500
      });
      form.reset();
    }

  }

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
          <Box component="form" onSubmit={handleAdd} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              type='text'
              label="Add Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name='category'
              id="outlined-select"
              select
              label="Select Your Category"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              margin="normal"
              name="description"
              required
              fullWidth
              multiline
              rows={4}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Survey
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateSurvey;