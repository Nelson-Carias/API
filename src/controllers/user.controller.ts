import {Request, Response} from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/User"
import { userInfo } from "os"
import { Rol } from "../models/Rol"

const userRepository = AppDataSource.getRepository(User)
class UserController {
    
    static createUser = async (req:Request, res:Response) =>{
        const {name, lastName, email, password} = req.body
        try{
            const user = new User()
            user.name = name 
            user.lastName = lastName
            user.email = email
            user.password = password

            await userRepository.save(user)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: `User was create`
            })

        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }

    static getUsers = async (req:Request, res:Response) => {
        try{
            const user = await userRepository.find({where:{state:true}})
            return user.length > 0 ? res.json({ok:true, user}) : res.json({ok:false, msg: `not found` })
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
        
    }

    static byIdUser = async (req:Request, res:Response) => {
        const id = parseInt (req.params.id)
        try{
            const user = await userRepository.findOne({where:{id, state:true}})
            return user ? res.json({ok:true, user}) : res.json({ok:false, msg: `not found`})
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }

    static deleteUser = async (req:Request, res:Response) => {
        const id = parseInt (req.params.id)
        try{
            const user = await userRepository.findOne({where:{id, state:true}})
            if(!user){
                return res.json({
                    ok: false,
                    StatusCode: 404,
                    message: `Not found`
                })  
            }
            user.state = false;
            await userRepository.save(user)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: `User was delete`
            })
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }

    static updateUser = async (req:Request, res:Response) => {
        const id = parseInt (req.params.id)
        const {name, lastName, email} = req.body

        try{
            const user = await userRepository.findOne({where:{id, state:true}})
            if(!name){
                return res.json({
                    ok: false,
                    StatusCode: 404,
                    message: `Not found`
                })
            }
            user.name = name,
            user.lastName = lastName,
            user.email = email 
            await userRepository.save(user)
            return res.json({
                ok: true,
                StatusCode: 200,
                message: `User was update`
            })
        }catch(error){
            ok: false
            StatusCode: 500
            message: `error = ${error.message}`
        }
    }
}
export default UserController