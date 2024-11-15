import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Navbar from '../../components/navbar';
import { usePost } from '../../hooks/usePost';
import { useFetch } from '../../hooks/useFetch';

export default function CourseManagement() {
  // State and Data
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedDays, setSelectedDays] = React.useState([]);
  const [occurrence, setOccurrence] = React.useState('');
  const [startTime, setStartTime] = React.useState(new Date());
  const [type, setType] = React.useState('');
  const [id, setId] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [professor, setProfessor] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(false);
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editingRow, setEditingRow] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(new Date()); // New state for real-time time
  const { postData, loading } = usePost('course')
  const { data, loading: loadingUser, fetchData } = useFetch('user/current')
  // Course Name and ID Mapping (Dropdown options)
  const courseOptions = [
    { name: 'Course 1', id: 'C1' },
    { name: 'Course 2', id: 'C2' },
    { name: 'Course 3', id: 'C3' },
    // Add more course options as needed
  ];

  // Update the current time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDayToggle = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleAddCourse = () => {
    if (!name || !type || !id || !startTime || selectedDays.length === 0 || !occurrence) {
      alert('Please complete all fields before adding a course.');
      return;
    }

    // Add course occurrences to the table
    const courseOccurrences = [];
    const endDate = new Date('2025-01-30');
    const currentDate = new Date('2024-10-01');

    while (currentDate <= endDate) {
      const day = currentDate.getDay();
      const isSelectedDay = selectedDays.includes(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][day - 1]);

      if (isSelectedDay) {
        const newCourse = {
          id: rows.length + courseOccurrences.length + 1,
          name,
          type,
          group: id,
          time: currentDate.toLocaleDateString('en-GB') + ' | ' + startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          attendance: 0,
        };
        courseOccurrences.push(newCourse);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    setRows((prevRows) => [...prevRows, ...courseOccurrences]);

    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000); // Hide success message after 3 seconds

    setName('');
    setType('');
    setId('');
    setStartTime(new Date());

    postData({ name, description, courseID: id, professor: data?._id })
  };

  const handleDeleteRow = (id) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id).map((row, index) => ({
        ...row,
        id: index + 1,
      }));
      return updatedRows;
    });
    setDeleteMessage(`Row with ID: ${id} has been deleted`);
    setTimeout(() => setDeleteMessage(''), 3000);
  };

  const handleEditRow = (row) => {
    setEditingRow(row);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    setRows(rows.map((row) => (row.id === editingRow.id ? editingRow : row)));
    setOpenEditDialog(false);
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'group', headerName: 'Group', width: 150 },
    { field: 'time', headerName: 'Time', width: 200 },
    { field: 'attendance', headerName: 'Attendance', width: 150 },
    {
      field: 'actions', headerName: 'Actions', width: 200, renderCell: (params) => (
        <>
          <Button onClick={() => handleDeleteRow(params.row.id)} color="error">Delete</Button>
          <Button onClick={() => handleEditRow(params.row)} color="primary">Edit</Button>
        </>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box sx={{ width: '100%', padding: 3 }}>
          {/* App Bar */}
          <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', padding: 3, justifyContent: 'flex-start' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <Tab label="Browse Classes" />
                <Tab label="Create New Class" />
              </Tabs>
            </Toolbar>
          </AppBar>

          {selectedTab === 0 && (
            <Box sx={{ padding: 2 }}>
              {/* Real-time date and week type */}
              <Typography variant="subtitle1">
                {currentTime.toLocaleString('en-GB')}
              </Typography>

              <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
                <DataGrid rows={rows} columns={columns} pageSize={5} disableRowSelectionOnClick />
                {deleteMessage && <Alert severity="error" sx={{ mt: 2 }}>{deleteMessage}</Alert>}
              </Box>
            </Box>
          )}

          {selectedTab === 1 && (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h5">Create a New Course</Typography>

              <FormControl fullWidth margin="normal">
                <Typography variant="subtitle1">NAME</Typography>
                <TextField fullWidth margin="normal" onChange={e => setName(e.target.value)} />
              </FormControl>
              <Typography variant="subtitle1">DESCRIPTION</Typography>
              <TextField fullWidth margin="normal" onChange={e => setDescription(e.target.value)} />
              <Typography variant="subtitle1">ID</Typography>
              <TextField fullWidth margin="normal" onChange={e => setId(e.target.value)} />
              <FormControl fullWidth margin="normal">
                <Typography variant="subtitle1">TYPE</Typography>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  {['COURSE', 'LABORATORY', 'SEMINARY'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                DAYS OF WEEK
              </Typography>
              <Box>
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDayToggle(day)}
                      />
                    }
                    label={day}
                  />
                ))}
              </Box>

              <FormControl component="fieldset" margin="normal">
                <Typography variant="subtitle1">OCCURRENCE</Typography>
                <RadioGroup
                  value={occurrence}
                  onChange={(e) => setOccurrence(e.target.value)}
                  row
                >
                  {['EVEN', 'ODD', 'EVEN&ODD'].map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                TIME
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  value={startTime}
                  onChange={(newTime) => setStartTime(newTime)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Button style={{ marginLeft: '320px' }} variant="contained" color="primary" onClick={handleAddCourse} sx={{ mt: 4 }}>
                Add Course
              </Button>

              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  COURSE ADDED SUCCESSFULLY
                </Alert>
              )}
            </Box>
          )}

        </Box>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogContent>
            <TextField label="ID" fullWidth margin="normal" value={editingRow?.id} onChange={(e) => setEditingRow({ ...editingRow, id: e.target.value })} />
            <TextField label="Name" fullWidth margin="normal" value={editingRow?.name} onChange={(e) => setEditingRow({ ...editingRow, name: e.target.value })} />
            <Select value={editingRow?.type} onChange={(e) => setEditingRow({ ...editingRow, type: e.target.value })}>
              {['COURSE', 'LABORATORY', 'PROJECT', 'SEMINARY'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
