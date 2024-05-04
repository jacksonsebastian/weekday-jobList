/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { JobCard } from "../../components/JobCard";

// Filter Options
const minJdSalaryMap = {
    '10L': 10,
    '20L': 20,
    '30L': 30,
    '40L': 40,
    '50L': 50,
    '60L': 60,
    '70L': 70
};
const jobRoles = [
    { title: 'Frontend', category: 'ENGINEER' },
    { title: 'Backend', category: 'ENGINEER' },
    { title: 'IOS', category: 'ENGINEER' },
    { title: 'Android', category: 'ENGINEER' },
    { title: 'Tech lead', category: 'ENGINEER' },
    { title: 'Flutter', category: 'ENGINEER' },
    { title: 'Fullstack', category: 'ENGINEER' },
    { title: 'React native', category: 'ENGINEER' },
    { title: 'Dev-ops', category: 'ENGINEER' },
    { title: 'Data engineer', category: 'ENGINEER' },
    { title: 'Data science', category: 'ENGINEER' },
    { title: 'Computer-vision', category: 'ENGINEER' },
    { title: 'Nlp', category: 'ENGINEER' },
    { title: 'Deep-learning', category: 'ENGINEER' },
    { title: 'Test / qa', category: 'ENGINEER' },
    { title: 'Web3', category: 'ENGINEER' },
    { title: 'Sre', category: 'ENGINEER' },
    { title: 'Data-infrastructure', category: 'ENGINEER' },
    { title: 'Designer', category: 'DESIGN' },
    { title: 'Design Manager', category: 'DESIGN' },
    { title: 'Graphic Designer', category: 'DESIGN' },
    { title: 'Product Designer', category: 'DESIGN' },
    { title: 'Product Manager', category: 'PRODUCT' },
    { title: "Operations Manager", category: 'OPERATIONS' },
    { title: "Founder's Office/Chief Of Staff", category: 'OPERATIONS' },
    { title: "Sales Development Representative", category: 'SALES' },
    { title: "Account Executive", category: 'SALES' },
    { title: "Account Manager", category: 'SALES' },
    { title: "Digital Marketing Manager", category: 'MARKETING' },
    { title: "Growth Hacker", category: 'MARKETING' },
    { title: "Marketing", category: 'MARKETING' },
    { title: "Product Marketing Manager", category: 'MARKETING' },
    { title: "Hardware", category: 'OTHER ENGINEERING' },
    { title: "Mechanical", category: 'OTHER ENGINEERING' },
    { title: "Systems", category: 'OTHER ENGINEERING' },
    { title: "Business Analyst", category: 'BUSINESS ANALYST' },
    { title: "Data Analyst", category: 'DATA ANALYST' },
    { title: "Project Manager", category: 'PROJECT MANAGER' },
    { title: "Management", category: 'MANAGEMENT' },
    { title: "Legal", category: 'LEGAL' },
    { title: "HR", category: 'HR' },
    { title: "Finance", category: 'FINANCE' }
];
const locations = ["Remote", "Hybrid", "In-Office"]
const experience = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const salaryRanges = ['10L', '20L', '30L', '40L', '50L', '60L', '70L'];

function JobList() {
    const [datas, setDatas] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const elementRef = useRef(null);

    const onInterSection = (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore) {
            fetchMoreItems();
        }
    };

    async function fetchMoreItems() {
        const response = await fetch(
            "https://api.weekday.technology/adhoc/getSampleJdJSON",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 10,
                    offset: page * 10,
                }),
            }
        );
        const data = await response.json();
        if (data.jdList.length === 0) {
            setHasMore(false);
        } else {
            setDatas((prevData) => [...prevData, ...data.jdList]);
            setPage((prevPage) => prevPage + 1);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onInterSection);

        if (observer && elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [datas]);


    // Filters start
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedJobRoles, setSelectedJobRoles] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState([]);

    console.log("selectedJobRoles:", selectedJobRoles)
    const companyNames = [...new Set(datas.map(item => item.companyName))];

    const filteredData = datas.filter(item => {
        const isIncludedCompany = selectedCompanies.length === 0 || selectedCompanies.includes(item.companyName);
        const isIncludedRole = selectedJobRoles.length === 0 || selectedJobRoles.some(role => role.title.toLowerCase() === item.jobRole.toLowerCase());
        const isIncludedExperience = selectedExperience.length === 0 || (item.minExp !== null && selectedExperience.includes(item.minExp.toString()));
        const isIncludedSalary = selectedSalary.length === 0 || (item.minJdSalary !== null && selectedSalary.some(range => item.minJdSalary >= minJdSalaryMap[range]));
        if (selectedLocations.includes("Remote")) {
            return isIncludedCompany && isIncludedRole && isIncludedExperience && isIncludedSalary && item.location.toLowerCase().includes("remote");
        } else if (selectedLocations.includes("Hybrid")) {
            return isIncludedCompany && isIncludedRole && isIncludedExperience && isIncludedSalary && item.location.toLowerCase().includes("hybrid");
        } else if (selectedLocations.includes("In-Office")) {
            return isIncludedCompany && isIncludedRole && isIncludedExperience && isIncludedSalary && !item.location.toLowerCase().includes("remote") && !item.location.toLowerCase().includes("hybrid");
        } else {
            return isIncludedCompany && isIncludedRole && isIncludedExperience && isIncludedSalary;
        }
    });

    



    console.log("selectedSalary:", selectedSalary)
    return (
        <>
            <Grid container spacing={2} py={2}>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Autocomplete
                        id="tags-outlined"
                        size="small"
                        multiple
                        options={jobRoles}
                        groupBy={(option) => option.category}
                        getOptionLabel={(option) => option.title}
                        value={selectedJobRoles}
                        onChange={(event, newValue) => {
                            setSelectedJobRoles(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Role" variant="outlined" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Autocomplete
                        id="tags-outlined"
                        size="small"
                        multiple
                        options={experience}
                        value={selectedExperience}
                        onChange={(event, newValue) => {
                            console.log("newValue:1", newValue)
                            setSelectedExperience(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                label="Experience"
                                placeholder="Search Experience"
                                sx={{
                                    "& .MuiChip-root": {
                                        borderRadius: "0",
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Autocomplete
                        id="tags-outlined"
                        size="small"
                        multiple
                        value={selectedLocations}
                        onChange={(event, newValue) => {
                            console.log("newValue:2", newValue)
                            setSelectedLocations(newValue);
                        }}
                        options={locations}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                label="Remote"
                                placeholder="Remote"
                                sx={{
                                    "& .MuiChip-root": {
                                        borderRadius: "0",
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Autocomplete
                        multiple
                        value={selectedSalary}
                        onChange={(event, newValue) => {
                            setSelectedSalary(newValue);
                        }}
                        options={salaryRanges}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                label="Minimum Base Pay Salary"
                                placeholder="Select Salary Range"
                                sx={{
                                    "& .MuiChip-root": {
                                        borderRadius: "0",
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        label="Company Name"
                        placeholder="Search Company Name"
                        onChange={(event) => {
                            const input = event.target.value.toLowerCase();
                            const filteredCompanies = companyNames.filter(company =>
                                company.toLowerCase().includes(input)
                            );
                            setSelectedCompanies(filteredCompanies);
                        }}
                    />

                </Grid>

            </Grid>

            {
                filteredData.length !== 0 ? <JobCard datas={filteredData} /> : <Box textAlign={'center'}>No data found</Box>
            }


            {hasMore && (
                <Box ref={elementRef} style={{ textAlign: "center" }}>
                    <CircularProgress style={{ marginTop: '20px' }} />
                </Box>
            )}
            {!hasMore && <Box textAlign={'center'}>No more data to load</Box>}
        </>
    );
}

export default JobList;