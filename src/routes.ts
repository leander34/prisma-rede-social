import { Router } from "express";
import indexUser from './controllers/IndexUserController'
import allUsers from './controllers/AllUsersController'
import createUser from './controllers/CreateUserController'
import createPost from './controllers/CreatePostController'
import createCategory from './controllers/CreateCategoyController'
import createPostWithCategory from './controllers/CreatePostWithCategory'
import connectAnExistingPostInACategory from './controllers/ConnectAnExistingPostInACategoryController'
import createUserAndPostAndCategory from './controllers/CreateUserAndPostAndCategoryController'
const routes = Router()

routes.get('/user/:id', indexUser.index)
routes.get('/allUsers', allUsers.index)
routes.post('/user', createUser.create)
routes.post('/post', createPost.create)
routes.post('/category', createCategory.create)
// crio o post e uma categoria juntos
routes.post('/postWithCategory', createPostWithCategory.create)
// conecto um post a uma categoria
routes.put('/connectPostAndCategory', connectAnExistingPostInACategory.create)
// criar um usuário, post e categoria junto
routes.post('/createUserAndPostAndCategory', createUserAndPostAndCategory.create)



export { routes }