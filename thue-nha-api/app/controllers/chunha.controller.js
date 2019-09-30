// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.xemlichsudangnha = async(req, res) => {
    let taikhoan = req.query.taikhoan    
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong
    let tinhtrang = Number(req.query.tinhtrang)

    xemlichsudangnha(dbConfig.connectionString, taikhoan, index, sodong, tinhtrang)
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

async function xemlichsudangnha(connectionString, taikhoan, index, sodong, tinhtrang) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tkChuNha', sql.NVarChar(sql.MAX), taikhoan)
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.input('tinhTrang', sql.Int, tinhtrang)
        request.output('dem', sql.Int)
        request.execute('xemNNhaTheoTK', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.huychunha = async(req, res) => {
    let tenCN = req.body.tenCN

    huychunha(dbConfig.connectionString, tenCN)
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
        res.send({ message: "Lỗi huỷ chủ nhà!!!" })
    })
};

async function huychunha(connectionString, tenCN) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoan2', sql.NVarChar(sql.MAX), tenCN)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xoaTK', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xacnhanchunha = async(req, res) => {
    let tenCN = req.body.tenCN
    let tenNV = req.body.tenNV

    xacnhanchunha(dbConfig.connectionString, tenCN, tenNV)
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
        res.send({ message: "Lỗi xác nhận chủ nhà!!!" })
    })
};

async function xacnhanchunha(connectionString, tenCN, tenNV) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoan2', sql.NVarChar(sql.MAX), tenCN)
        request.input('tKhoanNV', sql.NVarChar(sql.MAX), tenNV)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xacNhanTK', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xemChuNha = async(req, res) => {
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong
    let tinhtrang = Number(req.query.tinhtrang)

    xemChuNha(dbConfig.connectionString, index, sodong, tinhtrang)
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

async function xemChuNha(connectionString, index, sodong, tinhtrang) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.input('tinhTrang', sql.Int, tinhtrang)
        request.output('dem', sql.Int)
        request.execute('xemNChuNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}