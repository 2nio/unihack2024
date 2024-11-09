import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './index.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const DynamicPie = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [percent, setPercent] = useState("");
  const [label, setLabel] = useState("Final Exam");
  const [customLabel, setCustomLabel] = useState("");
  const [customPercent, setCustomPercent] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [groupData, setGroupData] = useState({
    "Group A - Math": [{ data: [{ id: 0, value: 100, label: "*Remaining" }] }],
    "Group B - Science": [{ data: [{ id: 0, value: 100, label: "*Remaining" }] }],
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

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

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: '13%', bgcolor: '#1976d2', color: 'white', padding: 2, height: '100vh', position: 'fixed' }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
              EDU.hub - Teacher
            </Typography>
      </Box>
    
    <Box sx={{  marginLeft: '15%', width: '85%'}}>
      <AppBar position="static">
        <Toolbar>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="GRADING SCHEMES" />
            <Tab label="ASSIGN COURSES" />
          </Tabs>
          <Tab label="Log Out"></Tab>
        </Toolbar>
      </AppBar>

      {selectedTab === 0 && (
        <Box sx={{ height: 400, width: '100%', padding: 2 }}>
          <div className="container">
            <div className="dsb-main">
              <h2>Select a Group and Course</h2>
              <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                <option value="">Select a Group and Course</option>
                <option value="Group A - Math">Group A - Math</option>
                <option value="Group B - Science">Group B - Science</option>
              </select>

              {selectedGroup && (
                <>
                  <PieChart series={groupData[selectedGroup]} width={400} height={200} />

                  <form onSubmit={handleAddSlice}>
                    <div className="bsd-input">
                      <input
                        type="number"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        placeholder="Enter percentage"
                        min="0"
                        max="100"
                        required
                      />
                      <select className="bsd-select" value={label} onChange={(e) => setLabel(e.target.value)}>
                        <option value="Final Exam">Final Exam</option>
                        <option value="Project">Project</option>
                        <option value="Homework">Homework</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Lab Work">Lab Work</option>
                      </select>
                    </div>
                    <div className="bsd-button">
                      <button type="submit">Add Slice</button>
                      <button type="button" onClick={() => setShowCustomForm(!showCustomForm)}>
                        {showCustomForm ? "Cancel Custom" : "Add Custom"}
                      </button>
                    </div>
                  </form>

                  {showCustomForm && (
                    <form onSubmit={handleAddCustomSlice}>
                      <div>
                        <input
                          type="text"
                          value={customLabel}
                          onChange={(e) => setCustomLabel(e.target.value)}
                          placeholder="Enter custom label"
                          required
                        />
                        <input
                          type="number"
                          value={customPercent}
                          onChange={(e) => setCustomPercent(e.target.value)}
                          placeholder="Enter custom percentage"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                      <button type="submit">Add Custom Slice</button>
                    </form>
                  )}

                  <div>
                    <h3>Grading Scheme for {selectedGroup}</h3>
                    <ul>
                      {groupData[selectedGroup][0].data.slice(1).map((slice, index) => (
                        <li key={index}>
                          {slice.label}: {slice.value}%
                          <button onClick={() => removeSlice(slice.id)} style={{ marginLeft: "10px" }}>
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          </Box>
      )}
    </Box>
    </Box>
  );
};

export default DynamicPie;
