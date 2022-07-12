import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
class CreatePost {
    async create(req: Request, res: Response) {
        const { title, content, id_user } = req.body
        if(!id_user) {
            return res.status(400).json({
                error: "id_user is required"
            })
        }
        try {
            const post = await prismaClient.post.create({
                data: {
                    title,
                    content,
                    user: {
                        connect: {
                            id: id_user
                        }
                    }
                },
            })
            return res.status(201).json(post)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel criar o post"
            })
        }
    }
}

export default new CreatePost()