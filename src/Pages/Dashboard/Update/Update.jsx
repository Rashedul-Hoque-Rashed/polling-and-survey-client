import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import useAxios from '../../../Hooks/useAxios';
import { useLoaderData } from 'react-router-dom';
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

const Update = () => {


  const axios = useAxios();

  const survey = useLoaderData();

  console.log(survey)

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;

    const surveyInfo = {
      title: title,
      description: description,
      category: category
    }

    const updateSurvey = await axios.patch(`/surveys/${survey._id}`, surveyInfo)
    if (updateSurvey.data.modifiedCount > 0) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `${surveyInfo?.title} updated successfully.`,
            showConfirmButton: false,
            timer: 1500
        });
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
            Update Survey
          </Typography>
          <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
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
              defaultValue={survey?.title}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name='category'
              id="outlined-select"
              select
              label="Select Your Category"
              defaultValue={survey?.category}
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
              defaultValue={survey?.description}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Survey
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Update;