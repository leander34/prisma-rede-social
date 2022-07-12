import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
class CreateUserAndPostAndCategory {
    async create(req: Request, res: Response) {
        const { name, username, email, age, title, content, name_category } = req.body
        try {
            const user = await prismaClient.user.create({
                data: {
                    name,
                    username,
                    email,
                    age,
                    posts: {
                        create: {
                            title,
                            content,
                            post_category: {
                                create: {
                                    category: {
                                        create: {
                                            name: name_category
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            })
            return res.status(201).json(user)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel criar tudo"
            })
        }
    }
}

export default new CreateUserAndPostAndCategory()