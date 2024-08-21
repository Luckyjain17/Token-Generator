import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography,Snackbar, Alert } from '@mui/material';

const TokenGenerator = () => {
  const [blueTokens, setBlueTokens] = useState([]);
  const [redTokens, setRedTokens] = useState([]);
  const [bluePrefix, setBluePrefix] = useState('');
  const [redPrefix, setRedPrefix] = useState('');
  const [blueTokensPerRow, setBlueTokensPerRow] = useState(5);
  const [redTokensPerRow, setRedTokensPerRow] = useState(5);
  const [numBlueTokens, setNumBlueTokens] = useState(0);
  const [numRedTokens, setNumRedTokens] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleGenerateClick = () => {
    if (numBlueTokens <= 0 || numRedTokens <= 0) {
      setSnackbarMessage('Number of tokens must be greater than 0.');
      setOpenSnackbar(true);
      return;
    }
    if (blueTokensPerRow <= 0 || redTokensPerRow <= 0) {
      setSnackbarMessage('Tokens per row must be greater than 0.');
      setOpenSnackbar(true);
      return;
    }
    if (!bluePrefix || !redPrefix) {
      setSnackbarMessage('Both blue and red token prefixes are required.');
      setOpenSnackbar(true);
      return;
    }
    generateTokens();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const generateTokens = () => {
    const generateTokenArray = (prefix, count) =>
      Array.from({ length: count }, (_, i) => `${prefix}${i + 1}`);

    setBlueTokens(generateTokenArray(bluePrefix, numBlueTokens));
    setRedTokens(generateTokenArray(redPrefix, numRedTokens));
  };

  const clearTokens = () => {
    setBlueTokens([]);
    setRedTokens([]);
    setBluePrefix('');
    setRedPrefix('');
    setBlueTokensPerRow(5);
    setRedTokensPerRow(5);
    setNumBlueTokens(0);
    setNumRedTokens(0);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Token Generator</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number of Blue Tokens"
            type="number"
            value={numBlueTokens}
            onChange={(e) => setNumBlueTokens(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Prefix for Blue Tokens"
            value={bluePrefix}
            onChange={(e) => setBluePrefix(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Blue Tokens Per Row"
            type="number"
            value={blueTokensPerRow}
            onChange={(e) => setBlueTokensPerRow(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number of Red Tokens"
            type="number"
            value={numRedTokens}
            onChange={(e) => setNumRedTokens(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Prefix for Red Tokens"
            value={redPrefix}
            onChange={(e) => setRedPrefix(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Red Tokens Per Row"
            type="number"
            value={redTokensPerRow}
            onChange={(e) => setRedTokensPerRow(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="space-between">
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateClick}
      >
        Generate
      </Button>

        <Button variant="outlined" color="secondary" onClick={clearTokens}>
          Clear
        </Button>
      </Box>
      <Box mt={4}>
        {blueTokens.length !== 0 && <Typography variant="h6">Blue Tokens</Typography>}
        <Grid container spacing={1}>
          {blueTokens.map((token, index) => (
            <Grid item xs={12 / blueTokensPerRow} key={index}>
              <Button variant="contained" color="primary" fullWidth>
                {token}
              </Button>
            </Grid>
          ))}
        </Grid>
        {redTokens.length !== 0 && <Typography variant="h6" mt={2}>Red Tokens</Typography>}
        <Grid container spacing={1}>
          {redTokens.map((token, index) => (
            <Grid item xs={12 / redTokensPerRow} key={index}>
              <Button variant="contained" color="secondary" fullWidth>
                {token}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TokenGenerator;
