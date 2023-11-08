import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const PORT = process.env.REACT_APP_HOST;

const UserImage = ({ userId, size = '60px' }) => {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (userId !== null) {
            setImageSrc(`${PORT}/users/image/${userId}`);
        }
    }, [userId]);

    return (
        <Box width={size} height={size}>
            {userId !== null ? (
                <img
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                    width={size}
                    height={size}
                    alt='user'
                    src={imageSrc}
                />
            ) : null}
        </Box>
    );
};

export default UserImage;
