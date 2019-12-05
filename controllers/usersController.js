
const User = require('../models/User')
const createError = require('http-errors');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    .select('-password -__v -tokens._id ')
    .sort('-lastName')
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.addUser = async (req, res, next) => {

  try {
    const user = new User(req.body)
    const token = user.generateAuthToken();
    await user.save();
    const data = user.getPublicFields();
    res
      .status(200)
      .header('x-auth', token)
      .send(user);
  } catch (e) {
    next(e)
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password -__v');
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser =  async (req, res, next) => {
  try {
    const  user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res
      .status(200)
      .send(user)
      .select('-password');
  } catch (e) {
    next(e)
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user =  await User.findByIdAndUpdate(req.params.id,req.body, {
      new: true,
      runValidators: true
    });
    if (!user) throw new createError.NotFound();
    const data = user.getPublicFields();
    res.status(200).send(user);
  } catch (e) {
    next(e)
  }
};

exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    const token = user.generateAuthToken();
    const canLogin = await user.checkPassword(password);
    if (!canLogin) throw new createError.NotFound();
    const data = user.getPublicFields();

    res
      .status(200)
      .header('x-auth', token)
      .send(data);
  } catch (e) {
    next(e);
  }
};

exports.authenticateUser = async (req, res, next) => {
  res.status(200).send(req.user);
};