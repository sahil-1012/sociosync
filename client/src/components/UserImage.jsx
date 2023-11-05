

import { Box } from '@mui/material'
import React from 'react'
const PORT = process.env.REACT_APP_HOST
const UserImage = ({ image, size = '60px' }) => {
    return (
        <Box width={size} height={size}>
            <img style={{ objectFit: 'cover', borderRadius: '50%' }}
                width={size} height={size}
                alt='user'
                src={`${PORT}/assets/${image}`}
            />

        </Box>
    )
}

export default UserImage