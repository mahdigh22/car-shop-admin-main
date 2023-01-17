import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Dialog, DialogTitle, Select, InputLabel, FormControl, Box, DialogContent, DialogActions, Button } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const { handleEdit, id,handleDelete } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popEdit, setPopEdit] = useState(false);
  const handleClose = (event) => {
    setPopEdit(false);
  };
  const [Status, setStatus] = useState('');

  const handleChange = (event) => {
    setStatus(event.target.value );
  };

  return (
    <>
      <Dialog onClose={handleClose} open={popEdit}>
        <DialogTitle>Set Client Status</DialogTitle>
        <DialogContent>
        <Box sx={{p:1,width:400}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={'Success'}>Success</MenuItem>
            <MenuItem value={'Banned'}>Banned</MenuItem>
            
          </Select>
        </FormControl></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{handleEdit(Status, id)}} >
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }}  onClick={() => {
            
              handleDelete(id);
            }}/>
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              setPopEdit(true);
              // handleEdit('true', id);
            }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
