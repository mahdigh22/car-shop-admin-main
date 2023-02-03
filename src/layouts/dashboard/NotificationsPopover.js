/* eslint-disable react/self-closing-comp */
/* eslint-disable  */
import { useState, useRef, useEffect } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/Iconify';

import MenuPopover from '../../components/MenuPopover';
import Scrollbar from 'src/components/Scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [message, setmessage] = useState([]||['']);
  const axios = require('axios');
  useEffect(() => {
    axios.get('https://carshopserver.vercel.app/message').then((resp) => {
      setmessage(resp.data);
    });
  }, []);

  const [notifications, setNotifications] = useState(message);
  const found = message?.filter((obj) => {
    return obj?.isRead === 'true';
  });
  const found2 = message?.filter((obj) => {
    return obj?.isRead === '';
  });
  console.log('found', found);
  const totalUnRead = found2?.length;
  // console.log(notifications);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event?.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  async function updateIsRead(status) {
    await axios
      .post('https://carshopserver.vercel.app/updateIsRead', {
        status,
      })
      .then(function (response) {
        // console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton
                color="primary"
                onClick={() => {
                  updateIsRead('true');
                }}
              >
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            } 
            
          >
            
            {message?.map((notification, index) => (
              <>
                <NotificationItem key={index} notification={notification} />
              </>
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem(props) {
  const { notification } = props;
 
  return (
   
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        // ...(notification.isUnRead && {
        //   bgcolor: 'action.selected',
        // }),
        backgroundColor:notification?.isRead ?'transparent':'gray'
      }}
      onClick={()=>{console.log('tess')}}
    >
      <ListItemAvatar>
        <Avatar>
          <NotificationsNoneIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification?.fullname}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {/* {fToNow(notification.createdAt)} */}
            {notification?.fullname}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------
