import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'

class IndexUser {
    async index(req: Request, res: Response) {
        const { id } = req.params
        if(!id) {
            return res.status(400).json({
                error: "id is required"
            })
        }
        try {
            const user = await prismaClient.user.findFirst({
                where: {
                    id
                },
                include: {
                    posts: {
                        select: {
                            title: true,
                            content: true,
                            post_category: {
                                select: {
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        },
                    }
                }
            })

            if (!user) {
                return res.status(400).json({
                    error: "Usuário não encontrado"
                })
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json({
                error: "Error ao tentar encontrar o usuário"
            })
        }
    }
}

export default new IndexUser()