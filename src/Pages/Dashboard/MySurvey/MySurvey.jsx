import { Button, Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { PacmanLoader } from "react-spinners";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MySurvey = () => {

    const { user } = useContext(AuthContext);
    const axios = useAxiosPublic();

    const { data: surveyData = [], isLoading, refetch } = useQuery({
        queryKey: ['mySurvey'],
        queryFn: async () => {
            const res = await axios.get(`/surveys?email=${user?.email}`);
            return res.data
        }
    })

    if (isLoading) {
        return <PacmanLoader
            color="#016A70"
            cssOverride={{ margin: '200px auto' }}
            margin={2}
            size={50}
        />
    }

    surveyData.forEach(entry => {
        const dateObject = new Date(entry.timestamp);
        const formattedTimestamp = `${dateObject.toLocaleTimeString()} ${dateObject.toLocaleDateString()}`;
        entry.timestamp = formattedTimestamp;
    });


    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, delete ${item.title}!`
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/surveys/${item._id}`)
                .then(res => {
                    if(res?.data?.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: `${item.title} has been deleted.`,
                            icon: "success"
                        });
                        refetch();
                    }
                })
                
            }
        });
    }



    return (
        <Container sx={{ py: 2 }}>
            <Grid container spacing={6} sx={{ py: 5 }}>
                {
                    surveyData.map(item => <Grid key={item._id} item xs={12} sm={6} lg={6}>
                        <Card sx={{ minWidth: 275, cursor: 'pointer' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.category}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Posted time: {item.timestamp}
                                </Typography>
                                <Typography color="text.secondary" variant="body2" sx={{ minHeight: 80, mt: 1.5 }}>
                                    {item.description}
                                    <br />
                                </Typography>
                                <Grid sx={{ mt: 1.5, display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Grid sx={{ display: "flex", alignItems: 'center', gap: '4px' }}>
                                        <Typography color="text.secondary">
                                            Total vote:
                                        </Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                                            {item.options.yes + item.options.no}
                                        </Typography>
                                    </Grid>
                                    <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Link to={`/dashboard/mySurvey/update/${item._id}`}>
                                        <Button
                                            variant="contained" color='success'
                                            startIcon={<UpdateIcon />}
                                        >
                                            Update
                                        </Button>
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(item)}
                                            variant="contained" color='error'
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>
                    </Grid>)
                }

            </Grid>
        </Container >
    );
};

export default MySurvey;