import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Button, Box, Typography, AppBar, Toolbar, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, TextField, Chip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from "dayjs";

const DynamicPie = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [percent, setPercent] = useState("");
  const [label, setLabel] = useState("Final Exam");
  const [customLabel, setCustomLabel] = useState("");
  const [customPercent, setCustomPercent] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submittedGroups, setSubmittedGroups] = useState({});


  const [selectedCourse, setSelectedCourse] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);


  const [groupData, setGroupData] = useState({
    "Group A - Math": [{ data: [{ id: 0, value: 100, label: "*Remaining" }] }],
    "Group B - Science": [{ data: [{ id: 0, value: 100, label: "*Remaining" }] }],
    "Group C - History": [{ data: [{ id: 0, value: 100, label: "*Remaining" }] }],
  });

  const courses = [
    { id: "101", name: "Math 101" },
    { id: "202", name: "Physics 202" },
    { id: "303", name: "Chemistry 303" },
  ];

  const handleVerifyKey = () => {
    if (uniqueKey.length === 6 && /^[0-9]+$/.test(uniqueKey)) {
      setIsVerified(true);
      setWarningMessage("");
    } else {
      setWarningMessage("Invalid key. Please enter a 6-digit number.");
      setIsVerified(false);
    }
  };

  const handleGroupSelection = (event) => {
    const { value } = event.target;
    if (value.length <= 100) {
      setSelectedGroups(value);
    } else {
      setWarningMessage("You can select up to 100 groups.");
    }
  };

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  const handleAddSlice = (e) => {
    e.preventDefault();
    const newId = groupData[selectedGroup][0].data.length;
    const newValue = Number(percent);
    const newLabel = label;

    if (isNaN(newValue) || newValue <= 0) {
      alert("Please enter a valid number greater than zero");
      return;
    }

    const totalValue = groupData[selectedGroup][0].data.slice(1).reduce((sum, slice) => sum + slice.value, 0);
    const remainingPercentage = 100 - totalValue - newValue;

    if (remainingPercentage < 0) {
      alert("Total value of new slices cannot exceed the remaining percentage.");
      return;
    }

    if (groupData[selectedGroup][0].data.length >= 7) {
      setWarningMessage("Limit reached (6 slices)");
      return;
    } else {
      setWarningMessage("");
    }

    const updatedData = [
      {
        data: [
          { id: 0, value: remainingPercentage, label: "*Remaining" },
          ...groupData[selectedGroup][0].data.slice(1),
          { id: newId, value: newValue, label: newLabel },
        ],
      },
    ];

    setGroupData((prev) => ({
      ...prev,
      [selectedGroup]: updatedData,
    }));

    setPercent("");
  };

  const handleAddCustomSlice = (e) => {
    e.preventDefault();
    const newValue = Number(customPercent);
    const newLabel = customLabel;

    if (isNaN(newValue) || newValue <= 0 || !newLabel.trim()) {
      alert("Please enter a valid label and percentage.");
      return;
    }

    const totalValue = groupData[selectedGroup][0].data.slice(1).reduce((sum, slice) => sum + slice.value, 0);
    const remainingPercentage = 100 - totalValue - newValue;

    if (remainingPercentage < 0) {
      alert("Total value of new slices cannot exceed the remaining percentage.");
      return;
    }

    if (groupData[selectedGroup][0].data.length >= 7) {
      setWarningMessage("Limit reached (6 slices)");
      return;
    } else {
      setWarningMessage("");
    }

    const updatedData = [
      {
        data: [
          { id: 0, value: remainingPercentage, label: "*Remaining" },
          ...groupData[selectedGroup][0].data.slice(1),
          { id: groupData[selectedGroup][0].data.length, value: newValue, label: newLabel },
        ],
      },
    ];

    setGroupData((prev) => ({
      ...prev,
      [selectedGroup]: updatedData,
    }));

    setCustomLabel("");
    setCustomPercent("");
    setShowCustomForm(false);
  };

  const removeSlice = (id) => {
    const updatedData = groupData[selectedGroup][0].data.filter(slice => slice.id !== id);
    const totalValue = updatedData.slice(1).reduce((sum, slice) => sum + slice.value, 0);
    const remainingPercentage = 100 - totalValue;

    setGroupData((prev) => ({
      ...prev,
      [selectedGroup]: [
        {
          data: [
            { id: 0, value: remainingPercentage, label: "*Remaining" },
            ...updatedData.slice(1),
          ],
        },
      ],
    }));
  };

  const handleSubmitScheme = () => {
    if (!selectedGroup) {
      setWarningMessage("Choose a group!");
      return;
    }

    if (groupData[selectedGroup][0].data[0].value > 0) {
      setSubmitMessage("Remaining percentage must be 0 to submit.");
    } else {
      const submissionDate = dayjs().format("DD/MM/YY HH:mm");
      setSubmittedGroups(prev => ({
        ...prev,
        [selectedGroup]: submissionDate,
      }));

    }
  };

  const selectedGroupData = selectedGroup && groupData[selectedGroup] ? groupData[selectedGroup][0].data : [];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box sx={{ width: '250px', bgcolor: '#1c1c1c', color: 'white', padding: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
          EDU.hub
        </Typography>

        <Button variant="text" color="inherit" sx={{ marginBottom: 2 }}>Dashboard</Button>
        <Button variant="text" color="inherit" sx={{ marginBottom: 2 }}>Grading Schemes</Button>
        <Button variant="text" color="inherit" sx={{ marginBottom: 2 }}>Assign Courses</Button>
        <Button variant="text" color="inherit" sx={{ marginBottom: 2 }}>Log Out</Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '100%', padding: 3 }}>
        {/* App Bar */}
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', padding: 3, justifyContent: 'flex-start'}}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
              <Tab label="Grading Schemes" />
              <Tab label="Assign Courses" />
            </Tabs>
          </Toolbar>
        </AppBar>


        {/* Content Area */}
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* Left Section: Form */}
          <Box sx={{ width: '50%', paddingRight: 3 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>Create or Edit Grading Scheme</Typography>

            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Select Group</InputLabel>
              <Select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} label="Select Group">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Group A - Math">Group A - Math</MenuItem>
                <MenuItem value="Group B - Science">Group B - Science</MenuItem>
                <MenuItem value="Group C - History">Group C - History</MenuItem>
              </Select>
            </FormControl>

            {selectedGroup && (
              <>
                <form onSubmit={handleAddSlice}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                    <TextField
                      label="Percentage"
                      variant="outlined"
                      type="number"
                      value={percent}
                      onChange={(e) => setPercent(e.target.value)}
                      required
                      sx={{ marginBottom: 2 }}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                      <InputLabel>Label</InputLabel>
                      <Select value={label} onChange={(e) => setLabel(e.target.value)} label="Label">
                        <MenuItem value="Final Exam">Final Exam</MenuItem>
                        <MenuItem value="Midterm">Midterm</MenuItem>
                        <MenuItem value="Assignment">Assignment</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: 2 }}>Add Slice</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowCustomForm(!showCustomForm)}
                    sx={{ marginBottom: 2, marginLeft: 2 }}
                  >
                    Add Custom Slice
                  </Button>
                </form>

                {showCustomForm && (
                  <form onSubmit={handleAddCustomSlice}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        label="Custom Label"
                        variant="outlined"
                        value={customLabel}
                        onChange={(e) => setCustomLabel(e.target.value)}
                        required
                        sx={{ marginBottom: 2 }}
                      />
                      <TextField
                        label="Percentage"
                        variant="outlined"
                        type="number"
                        value={customPercent}
                        onChange={(e) => setCustomPercent(e.target.value)}
                        required
                        sx={{ marginBottom: 2 }}
                      />
                      <Button type="submit" variant="contained" color="secondary">Add Custom Slice</Button>
                    </Box>
                  </form>
                )}
              </>
            )}
          </Box>

          {/* Right Section: Chart */}
          <Box sx={{ width: '50%', flexDirection: 'column', justifyContent: 'center' }}>
            {selectedGroup && selectedGroupData.length > 0 && (
              <PieChart series={groupData[selectedGroup]} width={600} height={400} />
            )}
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6">Grading Scheme for {selectedGroup}</Typography>
              <ul>
                {selectedGroupData.slice(1).map((slice, index) => (
                  <li key={index}>
                    {slice.label}: {slice.value}%
                    <Button
                      onClick={() => removeSlice(slice.id)}
                      sx={{
                        color: '#f44336',
                        marginLeft: 1,
                        textTransform: 'none',
                      }}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>

              {/* Submit Button */}
              {!submittedGroups[selectedGroup] ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitScheme}
                  sx={{ marginTop: 2 }}
                >
                  Submit to Group
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2, color: 'green' }}>
                  <CheckCircleIcon sx={{ marginRight: 1 }} />
                  <Typography>Submitted Successfully on {submittedGroups[selectedGroup]}!</Typography>
                </Box>
              )}
            </Box>

            {/* Warning and Success Messages */}
            {warningMessage && <Typography color="error" sx={{ marginTop: 2 }}>{warningMessage}</Typography>}
            {submitMessage && (
              <Typography color={submitMessage.includes("successfully") ? "green" : "error"} sx={{ marginTop: 2 }}>
                {submitMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DynamicPie;