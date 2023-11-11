import { Notifications } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

export default function NotificationIcon() {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Notifications sx={{ fontSize: '25px', color: dark }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box height={100} width={320} paddingX={1}>
                    <Typography variant="h6" color={dark} fontWeight="500" marginY={1}>
                        Nothing To Display as of now
                    </Typography>
                    <Divider />
                </Box>
            </Menu>
        </div>
    );
}
