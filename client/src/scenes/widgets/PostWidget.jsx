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
import { setComments, setPost } from "state";


const PORT = process.env.REACT_APP_HOST;


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

  const patchLike = async () => {
    const response = await fetch(`${PORT}/posts/${postId}/like`, {
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
    const response = await fetch(`${PORT}/comment/addComment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, postId, comment }),
    });

    const updatedComments = await response.json();

    dispatch(setComments({ comments: updatedComments }));
  };


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
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
          src={`http://localhost:3001/assets/${picturePath}`}
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
                <Typography variant="caption" sx={{ color: "text.secondary", pl: "1rem", width: '100%' }}>
                  {formatDate(comment.timestamp)} {/* Display the formatted timestamp */}
                </Typography>

                <Typography variant="caption" sx={{ color: "text.secondary", pl: "1rem" }}>
                </Typography>


                <Divider />
              </FlexBetween>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem", width: '100%' }} fullWidth>
                {comment.message} {/* Display the comment message */}
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
