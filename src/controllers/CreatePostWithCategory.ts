import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
class CreatePostWithCategory {
    async create(req: Request, res: Response) {
        const { name, title, content, id_user } = req.body
        try {
            const post = await prismaClient.post.create({
                data: {
                    title,
                    content,
                    user: {
                        connect: {
                            id: id_user
                        }
                    },
                    post_category: {
                        create: {
                            category: {
                                create: {
                                    name
                                }
                            }
                        }
                    }
                }
            })
            return res.status(201).json(post)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel criar o post com categoria"
            })
        }
    }
}

export default new CreatePostWithCategory()