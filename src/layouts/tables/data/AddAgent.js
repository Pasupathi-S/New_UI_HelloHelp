import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import axios from 'axios';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function AddAgent({ form, setForm, onAgentAdded, onClose }) {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'country_code') {
      newValue = value.replace(/[^\d+]/g, '').slice(0, 5);
    }

    if (name === 'password') {
      validatePassword(newValue);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, user_lastname, email, phone, password, country_code } = form;

    if (!username || !user_lastname || !email || !phone || !password) {
      alert('Please fill all fields.');
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!/^\+?\d{1,5}$/.test(country_code)) {
      alert('Enter a valid country code, like +91 or 1.');
      return;
    }

    const { length, uppercase, lowercase, number, special } = passwordValidation;
    if (!length || !uppercase || !lowercase || !number || !special) {
      alert('Password does not meet the required conditions.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://lemonpeak-hellohelp-backend.onrender.com/api/auth/register',
        {
          username,
          user_lastname,
          email,
          country_code,
          phone,
          password,
          is_agent: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (onAgentAdded) onAgentAdded();
      if (onClose) onClose();
    } catch (error) {
      alert('Failed to add agent.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox pt={3} px={3}>
          <MDInput
            type="text"
            label="First Name"
            name="username"
            fullWidth
            value={form.username}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            margin="normal"
          />
          <MDInput
            type="text"
            label="Last Name"
            name="user_lastname"
            fullWidth
            value={form.user_lastname || ''}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            margin="normal"
          />
          <MDInput
            type="email"
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            margin="normal"
          />
          <MDInput
            type="tel"
            label="Country Code"
            name="country_code"
            fullWidth
            value={form.country_code || ''}
            onChange={handleChange}
            inputProps={{ maxLength: 5 }}
            margin="normal"
          />
          <MDInput
            type="tel"
            label="Phone Number"
            name="phone"
            fullWidth
            value={form.phone}
            onChange={handleChange}
            inputProps={{ maxLength: 10 }}
            margin="normal"
          />
          <MDInput
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            inputProps={{ maxLength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
          />

          {/* Password validation checklist */}
          <MDBox mt={1} mb={2} color="text.secondary">
            <ul className="er-font-size" style={{ margin: 0, paddingLeft: '20px' }}>
              <li style={{ color: passwordValidation.length ? 'green' : 'red' }}>
                Minimum 8 characters
              </li>
              <li style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>
                At least 1 uppercase letter
              </li>
              <li style={{ color: passwordValidation.lowercase ? 'green' : 'red' }}>
                At least 1 lowercase letter
              </li>
              <li style={{ color: passwordValidation.number ? 'green' : 'red' }}>
                At least 1 number
              </li>
              <li style={{ color: passwordValidation.special ? 'green' : 'red' }}>
                At least 1 special character
              </li>
            </ul>
          </MDBox>

          {/* Buttons */}
          <MDBox mt={3} mb={2} display="flex" justifyContent="space-between">
            <MDButton variant="outlined" color="error" onClick={onClose}>
              Cancel
            </MDButton>
            <MDButton className="add-btn" type="submit">
              Add
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </form>
  );
}

AddAgent.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
  onAgentAdded: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddAgent;
