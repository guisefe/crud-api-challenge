const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, dateOfBirth } = req.body;

  if (!name || !email || !password || !dateOfBirth) {
    return res.status(400).json({ message: 'name, email, password and dateOfBirth are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'password must contain at least 8 characters' });
  }

  try {
    const existingUser = await User.exists({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    await User.create({ name, email: email.toLowerCase(), password, dateOfBirth });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (_error) {
    return res.status(400).json({ message: 'Unable to register user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password').lean();
    const passwordMatches = user && (await bcrypt.compare(password, user.password));

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    delete user.password;

    return res.json({ token, user });
  } catch (_error) {
    return res.status(500).json({ message: 'Unable to authenticate user' });
  }
};
