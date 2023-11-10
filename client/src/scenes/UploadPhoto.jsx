import { EditOutlined } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const UploadPhoto = ({ uploadURL }) => {
    const { palette } = useTheme();
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleConfirmUpload = async () => {
        if (selectedPhoto) {
            try {
                const formData = new FormData();
                formData.append('file', selectedPhoto);

                const response = await fetch(uploadURL, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Image uploaded successfully!');
                } else {
                    // Handle upload failure, e.g., show an error message
                    console.error('Image upload failed:', response.statusText);
                }
            } catch (error) {
                // Handle unexpected error, e.g., show an error message
                console.error('Error during image upload:', error.message);
            }
        }
    };

    return (
        <div>
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
                                '&:hover': { cursor: 'pointer' },
                            }}
                        >
                            <input {...getInputProps()} />
                            {!selectedPhoto ? (
                                <p>Add Picture Here</p>
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
                    <Box mt={2}>
                        <button onClick={handleConfirmUpload}>Confirm Upload</button>
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default UploadPhoto;
