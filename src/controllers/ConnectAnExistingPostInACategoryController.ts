import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
// tanto a categoria quanto o post já existe
// mas agora vamos conecta-los
// como se o usuário estivesse editando o seu post
class ConnectAnExistingPostInACategory {
    async create(req: Request, res: Response) {
        const { id_post, id_category } = req.body
        if(!id_post || !id_category) {
            return res.status(400).json({
                error: "ids are required"
            })
        }
        try {
            const postConnected = await prismaClient.post.update({
                where: {
                    id: id_post
                },
                data: {
                    post_category: {
                        create: {
                            category: {
                                connect: {
                                    id: id_category
                                }
                            }
                        }
                    }
                }
            })

            if(!postConnected) {
                return res.status(400).json({
                error: "post não encontrado"
            })
            }
            return res.status(201).json(postConnected)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel criar o post com categoria"
            })
        }
    }
}

export default new ConnectAnExistingPostInACategory()