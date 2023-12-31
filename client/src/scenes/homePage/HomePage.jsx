import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar/Navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id } = useSelector((state) => state.user);
    const { palette } = useTheme();
    const userPhoto = useSelector((state) => state.userPhoto);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} image={userPhoto} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget />

                    <Box ml='2px' mt='2rem'>
                        <Typography color={palette.dark} variant="h3" fontWeight="500">
                            Recent Posts
                        </Typography>
                    </Box>
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;