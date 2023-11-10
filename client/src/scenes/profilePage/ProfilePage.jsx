import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
    const { palette } = useTheme();

    const { userId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const currentUserId = useSelector((state) => state.user._id);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={userId}  />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >

                    {userId === currentUserId &&
                        <MyPostWidget />
                    }

                    <Box ml='2px' mt='2rem'>
                        <Typography color={palette.dark} variant="h3" fontWeight="500">
                            User Posts
                        </Typography>
                    </Box>

                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;