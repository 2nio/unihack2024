import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Calendar = ({ classesData }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date()); // Start with the current date

  // Generate the current week's dates (Monday-Sunday)
  const generateWeekDates = (currentDate) => {
    const weekStart = currentDate.getDate() - currentDate.getDay() + 1; // Get the Monday of the week
    const weekEnd = weekStart + 6; // Sunday
    const dates = [];

    for (let i = weekStart; i <= weekEnd; i++) {
      const date = new Date(currentDate.setDate(i));
      dates.push(date);
    }

    return dates;
  };

  // Filter classes based on current week's dates
  const filterClassesForCurrentWeek = () => {
    const filteredClasses = [];
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Get the current week dates
    const weekDates = generateWeekDates(new Date());

    // For each class in classesData, check if it occurs in the current week
    classesData.forEach((course) => {
      const classDate = new Date(course.time.split('|')[0]); // Extract date part
      const dayIndex = classDate.getDay(); // Get the day index (0 - Sunday, 6 - Saturday)

      if (weekDates.some((date) => date.toLocaleDateString() === classDate.toLocaleDateString())) {
        filteredClasses.push({
          ...course,
          date: weekDates[dayIndex], // Assign the corresponding date
          dayOfWeek: daysOfWeek[dayIndex], // Convert to weekday name (Mo, Tu, etc.)
        });
      }
    });

    setCalendarData(filteredClasses);
  };

  // Update the timetable when the "Update Timetable" button is clicked
  const updateTimetable = () => {
    filterClassesForCurrentWeek();
  };

  // Generate the weekly timetable grid
  const renderCalendarGrid = () => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
      <Grid container spacing={1}>
        {daysOfWeek.map((day, index) => (
          <Grid item xs={1} key={index}>
            <Typography variant="h6">{day}</Typography>
            {hours.map((hour, i) => {
              const classScheduled = calendarData.find(
                (course) =>
                  course.dayOfWeek === day && new Date(course.time).getHours() === hour
              );
              return (
                <Paper
                  key={i}
                  sx={{
                    height: 50,
                    backgroundColor: classScheduled ? 'lightblue' : 'transparent',
                    border: '1px solid #ddd',
                  }}
                >
                  {classScheduled ? `${classScheduled.name} ${classScheduled.type}` : ''}
                </Paper>
              );
            })}
          </Grid>
        ))}
      </Grid>
    );
  };

  // Handle the initialization of current week
  useEffect(() => {
    setCurrentWeekDates(generateWeekDates(new Date()));
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Calendar
      </Typography>
      <Button variant="contained" color="primary" onClick={updateTimetable}>
        Update Timetable
      </Button>
      <Box sx={{ marginTop: 3 }}>
        {renderCalendarGrid()}
      </Box>
    </Box>
  );
};

export default Calendar;
