const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: Post,
          attributes: ['title'],
          include: [
              {
                model: User,
                attributes: ['name'],
              },
          ]
        }
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: ['title'],
          include: [
              {
                model: User,
                attributes: ['name'],
              },
          ]
        }
      ],
    });

    console.log(commentData);

    // Serialize data so the template can read it
    const comments = commentData.get({ plain: true });

    console.log(comments);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/create', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const CommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!CommentData) {
      res.status(404).json({ message: 'No Comment found with this id!' });
      return;
    }

    res.status(200).json(CommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
