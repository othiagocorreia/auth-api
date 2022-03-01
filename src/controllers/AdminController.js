const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res){
        const {name, email, password} = req.body
        
        const hashedPass = await bcrypt.hash(password, 12)

        const existUser = await prisma.user.findFirst({where:{name}})
        if(existUser){
            return res.send("This user alredy exists")
        }

        const user = await prisma.user.create({
            data:{
                name,
                email, 
                password:hashedPass
            }
        })

        return res.send(user)
    },
    async login(req, res){
        const {email, password} = req.body

        const existUser = await prisma.user.findFirst({where:{email}, include:{user_roles:true}})
        if(!existUser){return res.send("This user does not exist")}

        const validPass = await bcrypt.compare(password, existUser.password)
        if(!validPass){ return res.send("Your crendentials are wrong")  }
        
        const token = jwt.sign(existUser, process.env.ACCESS_SECRET_KEY, {expiresIn:'5d'})

        delete existUser.password
        return res.send({existUser, token})
    },
    async delete(req, res){
        const {name} = req.body
        const user = await prisma.user.delete({where:{name}})
        return res.send(user)
    },
    async readAll(req, res){
        const user = await prisma.user.findMany()

        delete user.iat
        delete user.exp

        return res.send(user)
    },
    async assignRole(req, res){
        const {userName, role} = req.body 
        const name = req.userInfo.name

        const existUser = await prisma.user.findFirst({ where: { name }, include: { user_roles: true } })
        if(!existUser){ return res.send("That occours an error") }
        const roles = existUser.user_roles
        
        if(roles.create == false){
            return res.send("You do not have permission to do that")
        }

        const userAlredyAssigned = await prisma.user.findFirst({
            where:{
                name:userName
            }, include: { user_roles: true }
        })

        if(userAlredyAssigned.user_roles.role_name == role){
            return res.send("User alredy has those permissions")
        } else {
            const newUserAssigned = await prisma.user.update({
                where: {
                    name: userName
                },
                data: {
                    user_roles: {
                        create: {
                            role_name: role
                        }
                    }
                }
            })

            return res.send(newUserAssigned)
        }
        
        
    },
    async deniedRoleUser(req, res){
        const { userName, role } = req.body
        const name = req.userInfo.name

        const existUser = await prisma.user.findFirst({ where: { name }, include: { user_roles: true } })
        if (!existUser) { return res.send("That occours an error") }
        const roles = existUser.user_roles

        if (roles.update == false) {
            return res.send("You do not have permission to do that")
        }

       const userHasPermission = await prisma.user.findFirst({where:{name:userName}, include:{
           user_roles:true
       }})

       if(!userHasPermission){
           return res.send("User does not exist")
       }

       const userRole = userHasPermission.user_roles
       if(userRole[0].role_name != role){
        return res.send("User does not have this role")
       } else{
           const deletedRoleOnUser = await prisma.user_roles.delete({
                where:{
                    user_name_role_name:{
                        role_name:role,
                        user_name:userName
                    }
                }
           })
           return res.send(deletedRoleOnUser)
       }
       
       
    },
    async addNewPeople(req, res){
        //Verifica se o usuário pode

        const userName = req.userInfo.name
        const {name, email, password} = req.body
        const validPass = await bcrypt.hash(password, 12)

        const existUser = await prisma.user.findFirst({ where: { name:userName }, include: { user_roles: true } })
        if(!existUser){ return res.send("That occours an error") }
        const roles = existUser.user_roles

        if(roles.create == false){
            return res.send("You cannot create users")
        }

        const newuser = await prisma.user.create({
            data:{
                name,
                email, 
                password:validPass
            }
        })

        if(!newuser){
            return res.send("User cannot be created")
        }

        return res.send(newuser)
    }
}