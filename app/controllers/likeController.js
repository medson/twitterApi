const Tweet = require('../models/tweet');

module.exports = {
  async toggle(req, res, next) {
    try {
      const tweet = await Tweet.findById(req.params.id);

      if (!tweet) {
        res.status(400).json({ error: 'Tweet doesn\'t exist' });
      }
      const liked = tweet.likes.indexOf(req.userId);

      if (liked === -1) {
        tweet.likes.push(req.userId);
      } else {
        tweet.likes.splice(liked, 1);
      }

      await tweet.save();

      return res.status(201).json(tweet);
    } catch (err) {
      return next(err);
    }
  },

};
