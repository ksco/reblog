import { ORM } from 'redux-orm';

import Post from './models/Post';
import Label from './models/Label';
import User from './models/User';
import Comment from './models/Comment';

const orm = new ORM();
orm.register(Comment, Post, Label, User);

export default orm;