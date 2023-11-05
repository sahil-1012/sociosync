const { ManageAccountsOutlined, LocationOnOutlined, WorkOutlineOutlined } = require("@mui/icons-material");
const { useTheme, Typography, colors, Divider, Box } = require("@mui/material");
const { default: FlexBetween } = require("components/FlexBetween");
const { default: UserImage } = require("components/UserImage");
const { default: WidgetWrapper } = require("components/WidgetWrapper");
const { useEffect } = require("react");
const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");


const PORT = process.env.REACT_APP_HOST;

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`${PORT}/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
        return null;
    }

    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;
    return (
        <WidgetWrapper>
            {/* // ~ Row - 01 */}
            <FlexBetween gap='0.5rem'
                pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
                <FlexBetween gap="1rem">

                    <UserImage image={picturePath} />
                    <Box>

                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* // ~ ROW - 02*/}
                <Box p='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>

                <Divider />
                {/* // ~ ROW - 03*/}
            </FlexBetween>
        </WidgetWrapper >
    )

}