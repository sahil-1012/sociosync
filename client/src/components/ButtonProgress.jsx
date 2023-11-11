import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';

export default function ButtonProgress({ handleClick, loading, disabled, label = 'ADD POST', large = false }) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
                sx={{ p: large ? ' 1rem' : '' }}
                variant="contained"
                disabled={loading || disabled}
                onClick={handleClick}
                fullWidth
            >
                {label}
            </Button>
            {loading && (
                <CircularProgress
                    size={large ? 32 : 24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    );
}
