import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient'
class CreateUser {
    async create(req: Request, res: Response) {
        const { name, username, age, email } = req.body
        try {
            const user = await prismaClient.user.create({
                data: {
                    name,
                    username,
                    age,
                    email
                }
            })
            return res.status(201).json(user)
        } catch (error) {
            return res.status(400).json({
                error: "Não foi possivel cadastrar o usuário"
            })
        }
    }
}

export default new CreateUser()