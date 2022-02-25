const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

module.exports = {
    async create(req, res){
        const{name, description, create, read, update, delt} = req.body

        const existRole = await prisma.role.findFirst({where:{
            name
        }})

        if(existRole){
            return res.send("this role alredy exists")
        }
        const role = await prisma.role.create({
            data:{
                name, 
                description,
                create,
                read,
                update,
                delt
            }
        })

        
        return res.send(role)
    },
    async read(req, res) {
        const { name } = req.body

        const role = await prisma.role.findFirst({ where: { name } })

        return res.send(role)
    },
    async delete(req, res){
        //Verificar role do usuário
        const {roleName} = req.body
        const name = req.userInfo.name

        const user = await prisma.user.findFirst({where:{name}})

        if(!user){return res.send("Something was wrong")}

        const deleteRole = await prisma.role.delete({where:{name:roleName}})
        return res.send(deleteRole)
    }
}