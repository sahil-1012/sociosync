import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
const HOST = process.env.REACT_APP_HOST;
const CLOUD = process.env.REACT_APP_CLOUD;

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);


  const getFriends = async () => {
    const response = await fetch(`${HOST}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.length > 0 && friends.map((friend) => {
          const friendPhoto = `${CLOUD}/${friend._id}.jpeg`;
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              image={friendPhoto}
            />
          );
        })}

      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
