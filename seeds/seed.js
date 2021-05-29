const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comment.json');

const seedDB = async () => {
    await sequelize.sync({ force: true });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of postData) {
        await Post.create({
            ...post,
        });
    }

    process.exit(0);
};

seedDB();