const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./user.json');
const postData = require('./post.json');
const commentData = require('./comment.json');

const seedDB = async () => {
    try {
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
    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true
    });
    process.exit(0);
}
catch (err){
 console.log(err)
}
};

seedDB();