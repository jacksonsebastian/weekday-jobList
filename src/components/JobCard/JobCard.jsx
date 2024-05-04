import React, { useState } from 'react'
import { Box, Card, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, Button } from '@mui/material'

const JobCard = ({ datas }) => {
    console.log("datas:", datas);
    const [jobDescription, setJobDescription] = useState(null);

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setJobDescription(null);
        setOpen(false);
    };
    const handleShowMore = (jd) => {
        if (jd) {
            setJobDescription(jd);
            handleOpenDialog();
        } else {
            setJobDescription("No job description available");
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                {
                    datas?.map((data, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <Card sx={{ borderRadius: 3, p: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box elevation={4} sx={{
                                            width: '50%', display: 'flex', alignItems: 'center',
                                            padding: '4px 6px',
                                            boxShadow: 'rgba(6, 6, 6, 0.05) 0px 2px 6px 0px',
                                            borderRadius: '10px',
                                            border: '1px solid rgb(230, 230, 230)',
                                        }}>
                                            <Typography variant="body1" sx={{ fontSize: "9px", color: "rgba(0, 0, 0, 0.87)" }}>⏳ Posted 10 days ago</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box>
                                            <img src={data?.logoUrl} alt="logo" style={{
                                                width: '100%',
                                                height: '2.5rem',
                                                objectFit: 'cover',
                                            }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="h3" sx={{ color: "#8b8b8b", fontSize: '13px', letterSpacing: '1', mb: '3px', fontWeight: '600' }}>{data?.companyName ? data.companyName : ''}</Typography>
                                        <Typography variant="h2" sx={{ fontSize: '14px', textTransform: 'capitalize' }}>{data?.jobRole ? data.jobRole : ''}</Typography>
                                        <Typography variant="p" sx={{ fontSize: '11px', mt: "5px", textTransform: 'capitalize' }}>{data?.location ? data.location : ''}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" sx={{ fontSize: '14px', color: "rgb(77, 89, 106)" }}>Estimated Salary: &#x20b9; {data?.minJdSalary ? `${data?.minJdSalary} - ` : ''} {data?.maxJdSalary ? data?.maxJdSalary : ''} LPA <span aria-label="Offered salary range"> ✅</span></Typography>
                                        <Box sx={{
                                            height: '250px',
                                            overflow: 'hidden',
                                            maskImage: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))'
                                        }}>
                                            <Typography variant="body1" color="initial" sx={{ m: "10px 0px 0px", fontWeight: '500' }}>About Company:</Typography>
                                            <Typography variant="body1" color="initial" sx={{ fontSize: '1rem' }}><strong>About Us</strong></Typography>
                                            <Typography variant="body2" color="initial" sx={{ fontSize: '1rem', fontWeight: '400', m: "10px 0px 0px" }}>{data?.jobDetailsFromCompany ? data.jobDetailsFromCompany : ''}</Typography>
                                        </Box>
                                        <Box sx={{ cursor: 'pointer' }} onClick={() => handleShowMore(data?.jobDetailsFromCompany)} >
                                            <Typography variant="body1" sx={{ fontSize: '14px', color: '#4943da', textAlign: 'center', mb: '0.5rem' }}>Show more</Typography>
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="h3" sx={{ color: "#8b8b8b", fontSize: '13px', fontWeight: '600', letterSpacing: '1', mb: '3px', mt: '10px' }}>Minimum Experience</Typography>
                                            <Typography variant="h2" sx={{ fontSize: '14px' }}>{data?.minExp ? data.minExp : 0} years</Typography>
                                        </Box>

                                    </Grid>
                                </Grid>
                                <Box>
                                    <Button fullWidth variant="contained" sx={{
                                        background: "rgb(85, 239, 196)", color: '#000000', p: '8px 18px', fontWeight: '500', fontSize: '16px', boxShadow: 'none', margin: '5px 0', '&:hover': {
                                            backgroundColor: "rgb(85, 239, 196)",
                                        },

                                    }}
                                        onClick={() => {
                                            window.open(`${data.jdLink}`, '_blank');
                                        }}
                                    >
                                        ⚡Easy Apply
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleCloseDialog}>
                <DialogTitle textAlign={'center'}>
                    Job Description
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="h5" color="initial">About Company:</Typography>
                        {jobDescription}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default JobCard