import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
class CreateCategory {
    async create(req: Request, res: Response) {
        const { name } = req.body
        try {
            const category = await prismaClient.category.create({
                data: {
                    name
                }
            })
            return res.status(201).json(category)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel criar a categoria"
            })
        }
    }
}

export default new CreateCategory()