const User = require('../models/user');
const Tweet = require('../models/tweet');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  },

  async me(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const tweetCount = await Tweet.find({ user: user.id }).count();

      return res.status(200).json({
        user,
        tweetCount,
        followersCounts: user.followers.length,
        followingCounts: user.following.length,
      });
    } catch (err) {
      return next(err);
    }
  },

  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { following } = user;

      const tweets = await Tweet
        .find({
          user: { $in: [user.id, ...following] },
        })
        .limit(50)
        .sort('-createdAt');

      return res.status(200).json(tweets);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = req.userId;
      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'Password doesn\'t match' });
      }
      const user = await User.findByIdAndUpdate(id, { name, username }, { new: true });

      if (password) {
        user.password = password;
        await user.save();
      }

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

};
