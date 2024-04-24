import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    // const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Teacher Name: {teacherDetails?.name}
                    </Typography>
                    {/* <Typography variant="h6" gutterBottom>
                        Class Name: {teacherDetails?.teachSclass?.sclassName}
                    </Typography> */}
                    {teacherDetails?.teachSubject?.length > 0 ? (
                        teacherDetails.teachSubject.map((subject, index) => (
                            <div key={index}>
                                <Typography variant="h6" gutterBottom>
                                    Subject No. : {index+1}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Subject Name: {subject?.subName}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    Subject Code: {subject?.subCode}
                                </Typography>
                                {/* <Typography variant="h6" gutterBottom>
                                    Subject Sessions: {subject?.sessions}
                                </Typography> */}
                                {/* <Typography variant="h6" gutterBottom>
                                    Subject Class: {subject?.sclassName}
                                </Typography> */}
                            </div>
                        ))
                    ) : (
                        // <Button variant="contained" onClick={handleAddSubject}>
                        //     Add Subject
                        // </Button>
                        <Typography variant="h6" gutterBottom>
                                    No Subject Assigned
                                </Typography>
                
                    )}
                </Container>
            )}
        </>
    );
};

export default TeacherDetails;