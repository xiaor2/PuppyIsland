import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  // ShareOutlined,
} from "@mui/icons-material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Divider, Button, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath)
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [currPost, setCurrPost] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", loggedInUserId);
    formData.append("comment", currPost);

    await fetch(`${window.env.REACT_APP_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    });
    const response = await fetch(
      `${window.env.REACT_APP_URL}/posts/${postId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const updatedPost = await response.json();
    // console.log(updatedPost);
    dispatch(setPost({ post: updatedPost }));
    setCurrPost("")
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${window.env.REACT_APP_URL}/posts/${postId}/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }

  const patchLike = async () => {
    const response = await fetch(
      `${window.env.REACT_APP_URL}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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
          src={`${window.env.REACT_APP_URL}/assets/${picturePath}`}
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
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* <IconButton>
          <ShareOutlined />
        </IconButton> */}
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <>
              <Divider />
              <FlexBetween>
                <Box key={`${name}-${i}`}>
                  <Typography sx={{ color: main, m: "0.75rem 0", pl: "1rem", }}>
                    {comment.content}
                  </Typography>
                </Box>
                {loggedInUserId === comment.author ?
                  <IconButton onClick={() => handleDelete(comment._id)}>
                    <DeleteOutlineIcon />
                  </IconButton> : null}
              </FlexBetween>
            </>
          ))}
          <Divider />
          <FlexBetween gap="1.5rem" p="1rem">
            <UserImage image={loggedInUserPicturePath} />
            <InputBase
              placeholder="Leave your comment!"
              onChange={(e) => setCurrPost(e.target.value)}
              value={currPost}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                padding: "1rem 2rem",
              }}
            />
            <Button
              disabled={!currPost}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
