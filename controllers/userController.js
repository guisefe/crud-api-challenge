const User = require('../models/User');

const EDITABLE_FIELDS = new Set(['name', 'email', 'dateOfBirth']);
const SORT_FIELDS = new Set(['name', 'email', 'dateOfBirth']);

function parseSort(value) {
  if (!value) return {};

  return String(value)
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean)
    .reduce((sort, field) => {
      const descending = field.startsWith('-');
      const name = descending ? field.slice(1) : field;
      if (SORT_FIELDS.has(name)) sort[name] = descending ? -1 : 1;
      return sort;
    }, {});
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (_error) {
    return res.status(400).json({ message: 'Invalid user id' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(204).send();
  } catch (_error) {
    return res.status(400).json({ message: 'Invalid user id' });
  }
};

exports.patchUser = async (req, res) => {
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([field]) => EDITABLE_FIELDS.has(field)),
  );

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No editable fields were provided' });
  }
  if (updates.email) updates.email = updates.email.toLowerCase();

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .select('-password')
      .lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (_error) {
    return res.status(400).json({ message: 'Unable to update user' });
  }
};

exports.getUsers = async (req, res) => {
  const { sort, name, email, dateOfBirth } = req.query;
  const filters = {};

  if (name) filters.name = { $regex: String(name), $options: 'i' };
  if (email) filters.email = String(email).toLowerCase();
  if (dateOfBirth) filters.dateOfBirth = dateOfBirth;

  try {
    const users = await User.find(filters).select('-password').sort(parseSort(sort)).lean();
    return res.json(users);
  } catch (_error) {
    return res.status(400).json({ message: 'Invalid query parameters' });
  }
};
