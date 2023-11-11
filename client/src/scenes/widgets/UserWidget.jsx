import { setCurrentUser, setLogin } from "state";

const { ManageAccountsOutlined, LocationOnOutlined, WorkOutlineOutlined, EditOutlined, LinkedIn, Twitter } = require("@mui/icons-material");
const { useTheme, Typography, Divider, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, TextField } = require("@mui/material");
const { default: FlexBetween } = require("components/FlexBetween");
const { default: UserImage } = require("components/UserImage");
const { default: WidgetWrapper } = require("components/WidgetWrapper");
const { useEffect, useState } = require("react");
const { useSelector, useDispatch } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const PORT = process.env.REACT_APP_HOST;

const UserWidget = ({ userId }) => {
  const currentUserId = useSelector((state) => state.user._id);

  const [modal, setModal] = useState(false);
  const openModal = () => { setModal(true) }
  const closeModal = () => { setModal(false) }

  const [user, setUser] = useState({});
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const response = await fetch(`${PORT}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setUser(data.user);
  };

  const [newName, setNewName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.firstName === null || user?.firstName === undefined || user._id !== userId) {
        await getUser();
      }
    };

    fetchData();

    if (user.firstName && newName === null) {
      setNewName(user.firstName + " " + user.lastName);
    }

  }, [user, userId]);  // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const submitName = async () => {
    const nameParts = newName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' '); // The rest as the last name

    const response = await fetch(`${PORT}/users/updateName/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    const resp = await response.json();
    if (resp.success) {
      // dispatch(setCurrentUser({ user: updatedUser }));
      closeModal();
      getUser();
    }
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    photo
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={photo} onClick={() => navigate(`/profile/${userId}`)} />
          <Box
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>

        {userId === currentUserId &&
          <IconButton onClick={openModal}>
            <ManageAccountsOutlined />
          </IconButton>
        }
      </FlexBetween>

      <Dialog
        open={modal}
        onClose={closeModal}
        maxWidth='450px'
      >
        <DialogTitle
          style={{ width: '400px' }}
        >Edit Profile Name</DialogTitle>
        <DialogContent >
          <TextField
            fullWidth
            name="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} style={{ color: '#e53935' }}>Discard</Button>
          <Button onClick={submitName} autoFocus>
            Confirm
          </Button>
        </DialogActions>

      </Dialog>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Twitter />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LinkedIn />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper >
  );
};

export default UserWidget;