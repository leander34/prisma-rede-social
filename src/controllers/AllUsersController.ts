import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'

class AllUser {
    async index(req: Request, res: Response) {
        try {
            const user = await prismaClient.user.findMany({
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

export default new AllUser()