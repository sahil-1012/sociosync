import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

const UploadPhoto = ({ handleSkip }) => {

    const uploadURL = 'https://sociopedia.s3.us-east-005.backblazeb2.com/654e1017331edcc7228b5382.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=0052c4efc5df2780000000004%2F20231110%2Fus-east-005%2Fs3%2Faws4_request&X-Amz-Date=20231110T111223Z&X-Amz-Expires=900&X-Amz-Signature=ce3f05a882dcc828d370dbb8ac93710ed9fc25beee6da80a1a9ea24cc6df77ef&X-Amz-SignedHeaders=host&x-id=PutObject'
    const { palette } = useTheme();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const isNonMobile = useMediaQuery("(min-width:600px)")

    // useEffect(() => {
    //     if (uploadURL === null || uploadURL === undefined) {
    //         handleSkip()
    //     }
    //     console.log(uploadURL)
    // }, [uploadURL])

    const handleConfirmUpload = async () => {
        if (selectedPhoto) {
            try {
                const formData = new FormData();
                formData.append('file', selectedPhoto);
                console.log(formData)
                const response = await fetch(uploadURL, {
                    method: 'PUT',
                    body: formData,
                });

                console.log(response)
                if (response.ok) {
                    console.log('Image uploaded successfully!');
                } else {
                    console.error('Image upload failed:', response.statusText);
                }
            } catch (error) {
                console.error('Error during image upload:', error.message);
            }
        }
    };

    return (
        <>
            <Box
                gridColumn='span 4'
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius='5px'
                p='1rem'
            >
                <Dropzone
                    acceptedFiles='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles) => setSelectedPhoto(acceptedFiles[0])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p='1rem'
                            sx={{
                                height: '300px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': { cursor: 'pointer' },
                            }}
                        >
                            <input {...getInputProps()} />
                            {!selectedPhoto ? (
                                <Typography fontWeight='500' variant='h5'>
                                    Add Picture Here
                                </Typography>
                            ) : (
                                <FlexBetween>
                                    <Typography>{selectedPhoto.name}</Typography>
                                    <EditOutlined />
                                </FlexBetween>
                            )}
                        </Box>
                    )}
                </Dropzone>

                {selectedPhoto && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: '20px',
                        flexWrap: 'wrap',
                        mt: '2.5rem'
                    }}>
                        <Button variant='outlined' size='large' sx={{ width: isNonMobile ? '200px' : '100%' }} color='error' onClick={handleSkip}>
                            Skip as of now
                        </Button>
                        <Button variant='contained' size='large' sx={{ width: isNonMobile ? '200px' : '100%' }} onClick={handleConfirmUpload}>
                            Confirm Upload
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default UploadPhoto;