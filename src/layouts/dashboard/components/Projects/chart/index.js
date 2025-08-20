import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import InsertChartIcon from '@mui/icons-material/InsertChart';

const formatDateLabel = (str, range) => {
  if (range === '1_year') {
    const [year, month] = str.split('-');
    const monthName = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][parseInt(month, 10) - 1];
    return `${monthName} ${year}`;
  }
  const [year, month, day] = str.split('-');
  const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][parseInt(month, 10) - 1];
  return `${parseInt(day, 10)} ${monthName}`;
};
const generateDateLabels = (start, end) => {
  if (!start || !end) return [];
  const [sY, sM, sD] = start.split('-').map(Number);
  const [eY, eM, eD] = end.split('-').map(Number);
  let startDate = new Date(sY, sM - 1, sD);
  let endDate = new Date(eY, eM - 1, eD);
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate];
  const labels = [];
  const date = new Date(startDate);
  while (date <= endDate) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    labels.push(`${yyyy}-${mm}-${dd}`);
    date.setDate(date.getDate() + 1);
  }
  return labels;
};
const aggregateMonthly = (data) => {
  const monthMap = {};
  data.forEach(({ date, users }) => {
    const monthKey = date.slice(0, 7); // YYYY-MM
    monthMap[monthKey] = (monthMap[monthKey] || 0) + users;
  });
  return Object.entries(monthMap).map(([month, users]) => ({
    date: month,
    users,
  }));
};
const CallsChartCard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState('1_month');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const resetFilters = () => {
    setDateRange('1_month');
    setSelectedMonth('');
    setSelectedDate('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        let queryParam = '';
        if (selectedDate) queryParam = `date=${selectedDate}`;
        else if (selectedMonth) queryParam = `month=${selectedMonth}`;
        else if (dateRange) queryParam = `range=${dateRange}`;
        else queryParam = `range=1_month`;

        const res = await axios.get(
          `http://localhost:5000/api/admin/customerss-daywise?${queryParam}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const labels = Array.isArray(res.data.labels) ? res.data.labels : [];
        const data = Array.isArray(res.data.data) ? res.data.data : [];

        if (!labels.length) {
          setChartData([]);
          return;
        }

        const dateToUsers = {};
        labels.forEach((label, i) => {
          dateToUsers[label] = parseInt(data[i] || 0, 10);
        });

        const sortedLabels = [...labels].sort();
        let filledData = generateDateLabels(
          sortedLabels[0],
          sortedLabels[sortedLabels.length - 1]
        ).map((date) => ({ date, users: dateToUsers[date] || 0 }));

        if (dateRange === '1_year') {
          filledData = aggregateMonthly(filledData);
        }

        setChartData(filledData);
      } catch (err) {
        console.error('Error fetching user creation stats:', err);
        setChartData([]);
      }
    };

    fetchData();
  }, [selectedDate, selectedMonth, dateRange]);

  // Detect current month
  const today = new Date();
  const currentMonthString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    '0'
  )}`;
  const isCurrentMonth = selectedMonth === currentMonthString;

  // Short range = 7 days, single date, or current month
  const isShortRange = dateRange === '1_week' || selectedDate !== '' || isCurrentMonth;

  // Chart width
  const chartWidth = isShortRange ? '100%' : Math.max(chartData.length * 60, 800);

  return (
    <Card
      sx={{
        height: '100%',
        marginLeft: '-17px',
        width: isMobile ? '100%' : '156%',
        borderRadius: 3,
      }}
    >
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        sx={{
          background: '#1D4ED8',
          color: 'white',
          fontWeight: 600,
          boxShadow: 'none',
        }}
        borderRadius="lg"
        coloredShadow="info"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          {/* Left side: Title */}
          <Box display="flex" alignItems="center" gap={1}>
            <InsertChartIcon style={{ color: '#fff' }} fontSize="medium" />
            <MDTypography variant="h6" fontWeight="bold" color="white">
              User Creation Analytics{' '}
            </MDTypography>
          </Box>

          {/* Right side: Filters */}
          <Box display="flex" gap={1} flexWrap="wrap">
            <Select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                setSelectedMonth('');
                setSelectedDate('');
              }}
              size="small"
              sx={{ backgroundColor: '#f1f2f5ff', minWidth: 140 }}
            >
              <MenuItem value="1_week">Last 7 Days</MenuItem>
              <MenuItem value="1_month">Last 1 Month</MenuItem>
              <MenuItem value="3_month">Last 3 Months</MenuItem>
              <MenuItem value="1_year">Last 1 Year</MenuItem>
            </Select>

            <Select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setSelectedDate('');
                setDateRange('');
              }}
              displayEmpty
              size="small"
              sx={{ backgroundColor: '#f1f2f5ff', minWidth: 120 }}
            >
              <MenuItem value="">Select Month</MenuItem>
              <MenuItem value="2025-06">June</MenuItem>
              <MenuItem value="2025-07">July</MenuItem>
              <MenuItem value="2025-08">August</MenuItem>
            </Select>

            <TextField
              type="date"
              size="small"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedMonth('');
                setDateRange('');
              }}
              sx={{
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f1f2f5ff',
                },
                '& input': {
                  padding: '18px',
                },
              }}
            />

            <Button
              variant="outlined"
              color="secondary"
              onClick={resetFilters}
              sx={{ minWidth: 80 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </MDBox>

      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Total: {chartData.length} {dateRange === '1_year' ? 'months' : 'days'}
        </Typography>

        {isShortRange ? (
          <ResponsiveContainer width="100%" height={isMobile ? 300 : 380}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="date"
                tickFormatter={(label) => formatDateLabel(label, dateRange)}
                tick={{ fontSize: 12 }}
                stroke={theme.palette.text.secondary}
                angle={-45}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis
                label={{
                  value: 'Users Created',
                  angle: -90,
                  position: 'insideLeft',
                  fontSize: 13,
                  fill: theme.palette.text.secondary,
                }}
                tick={{ fontSize: 12 }}
                stroke={theme.palette.text.secondary}
                allowDecimals={false}
              />
              <Tooltip
                formatter={(value) => [`${value} users`, 'Users']}
                labelFormatter={(label) => {
                  if (dateRange === '1_year') {
                    const [year, month] = label.split('-');
                    return `${month}-${year}`;
                  }
                  const [year, month, day] = label.split('-');
                  return `${day}-${month}-${year}`;
                }}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  boxShadow: theme.shadows[3],
                }}
              />
              <Bar
                dataKey="users"
                fill={theme.palette.primary.main}
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
            <Box sx={{ width: chartWidth }}>
              <BarChart
                width={chartWidth}
                height={isMobile ? 300 : 380}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(label) => formatDateLabel(label, dateRange)}
                  tick={{ fontSize: 12 }}
                  stroke={theme.palette.text.secondary}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis
                  label={{
                    value: 'Users Created',
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 13,
                    fill: theme.palette.text.secondary,
                  }}
                  tick={{ fontSize: 12 }}
                  stroke={theme.palette.text.secondary}
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(value) => [`${value} users`, 'Users']}
                  labelFormatter={(label) => {
                    if (dateRange === '1_year') {
                      const [year, month] = label.split('-');
                      return `${month}-${year}`;
                    }
                    const [year, month, day] = label.split('-');
                    return `${day}-${month}-${year}`;
                  }}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                    borderRadius: 8,
                    boxShadow: theme.shadows[3],
                  }}
                />
                <Bar
                  dataKey="users"
                  fill={theme.palette.primary.main}
                  radius={[8, 8, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CallsChartCard;
