import { query } from './dbconfig'

const db = query()
const SQL = {
    getUserEP: async (email: string, password: string) => {
        let sql = "select * from user where email=? and password=?"
        let user = await db.query(sql, [email, password])
        return user[0]
    },
    getUserId: async (id: any) => {
        let sql = "select * from user where id=?"
        let user = await db.query(sql, id)
        return user[0][0]
    },
    authorSql: "update user set author=? where id=?",
    authorEmail: "select * from user where email=?",
    getUserEamil: async (email: string) => {
        let sql = "select * from user where email=?"
        var user = await db.query(sql, email)
        return user[0]
    },
    registerUser: async (email: string, password: string) => {
        let sql = "insert into user (email,password,author) values (?,?,?)"
        await db.query(sql, [email, password, 0])
    },
    updateHeader: async (avatar: any, id: any) => {
        let sql = "update user set header_img=? where id=?"
        var user = await db.query(sql, [avatar, id])
        return user[0]
    },
    authorById: "select author from user where id=?",
    getUserById:"select * from user where id=?",
    updatePayStatusById: "update user set pay_time=?,end_time=? ,author=? where id=?",
    insertUserSql: async (email: string, name: string,image:string) => {
        let sql = "insert into user (email,name,header_img) values (?,?,?)"
        await db.query(sql, [email, name,image])
    }
}
export default SQL