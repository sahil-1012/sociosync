import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Send,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { formatDate } from "Functions/regularFunctions";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";


const HOST = process.env.REACT_APP_HOST;
const CLOUD = process.env.REACT_APP_CLOUD;


const PostWidget = ({ postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {

  const profilePhoto = `${CLOUD}/${postUserId}.jpeg`;
  const postPhoto = `${CLOUD}/posts/${picturePath}.jpeg`;

  const [comment, setComment] = useState("");
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes?.[loggedInUserId]);
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`${HOST}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

  };

  const submitComment = async () => {
    const response = await fetch(`${HOST}/comment/addComment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, postId, comment }),
    });

    const updatedPost = await response.json();
    setComment("")
    dispatch(setPost({ post: updatedPost }));
  };


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        image={profilePhoto}
      />

      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={postPhoto}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">

          <TextField
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            fullWidth multiline={true} rows={2}
            placeholder="Add Your Precious Words" />

          <Box style={{ display: "flex", justifyContent: 'end' }}>
            <Button fullWidth variant="contained" endIcon={<Send />}
              style={{ marginTop: '1rem', marginBottom: '1rem', maxWidth: '100px' }}
              onClick={submitComment}
              type="submit"
            >
              Send
            </Button>
          </Box>

          {comments?.map((comment, i) => (
            <>
              <FlexBetween key={`${name}-${i}`}>
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  style={{ width: '100%', height: '100%' }}
                >
                  {comment.username}
                </Typography>

                <Typography variant="caption" color={medium} fontSize="0.7rem" sx={{ pl: '1rem', mb: '0px', display: 'flex', width: '150px' }}>
                  {formatDate(comment.timestamp)}
                </Typography>
              </FlexBetween>

              <Typography mb='1rem' color={medium} sx={{ pl: "2px", width: '100%' }} fullWidth>
                {comment.message}
              </Typography>

            </>
          ))}

          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
