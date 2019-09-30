// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.huynha = async(req, res) => {
    let id = req.body.id
    let taikhoanNT = req.body.taikhoanNT

    huynha(dbConfig.connectionString, id, taikhoanNT)
    .then((result) => {
        let { out } = result.output
        out = out ? out : ""
        let split = out.split(",")
        let message = split[1] ? split[1] : ""

        res.send({ 
            message: message.trim()
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ message: "Lỗi huỷ nhà!!!" })
    })
};

async function huynha(connectionString, id, taikhoanNT) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('idNha', sql.NVarChar(sql.MAX), id)
        request.input('tKhoanNguoiThue', sql.NVarChar(sql.MAX), taikhoanNT)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xoaThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xacnhannha = async(req, res) => {
    let id = req.body.id
    let taikhoanNT = req.body.taikhoanNT

    xacnhannha(dbConfig.connectionString, id, taikhoanNT)
    .then((result) => {
        let { out } = result.output
        out = out ? out : ""
        let split = out.split(",")
        let message = split[1] ? split[1] : ""

        res.send({ 
            message: message.trim()
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ message: "Lỗi xác nhận nhà!!!" })
    })
};

async function xacnhannha(connectionString, id, taikhoanNT) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoanNguoiThue', sql.NVarChar(sql.MAX), taikhoanNT)
        request.input('idNha', sql.NVarChar(sql.MAX), id)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xacNhanThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xemNha = async(req, res) => {
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong
    let tinhtrang = Number(req.query.tinhtrang)

    xemNha(dbConfig.connectionString, index, sodong, tinhtrang)
    .then((result) => {
        let { dem } = result.output
        let data = result.recordset ? result.recordset : []

        res.send({ 
            nha: data,
            dem: dem
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ nha: [], dem: 0 })
    })
};

async function xemNha(connectionString, index, sodong, tinhtrang) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.input('tinhTrang', sql.Int, tinhtrang)
        request.output('dem', sql.Int)
        request.execute('xemNThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}