// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.dangnha = async(req, res) => {
    let diaChi = req.body.diaChi
    let soPhong = Number(req.body.soPhong)
    let tienthue1Thang = Number(req.body.tienthue1Thang)
    let taikhoan = req.body.taikhoan
    let idNha = Number(req.body.idNha)

    dangnha(dbConfig.connectionString, diaChi, soPhong, tienthue1Thang, taikhoan, idNha)
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
        res.send({ message: "Lỗi đăng nhà!!!" })
    })
};

async function dangnha(connectionString, diaChi, soPhong, tienthue1Thang, taikhoan, idNha) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dChi', sql.NVarChar(sql.MAX), diaChi)
        request.input('soPhong', sql.Int, soPhong)
        request.input('tienThue', sql.Int, tienthue1Thang)
        request.input('idLoaiNha', sql.Int, idNha)
        request.input('tkChuNha', sql.NVarChar(sql.MAX), taikhoan)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('themNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.thuenha = async(req, res) => {
    let id = req.body.id
    let taikhoan = req.body.taikhoan
    let nhanxet = req.body.nhanxet

    thuenha(dbConfig.connectionString, id, taikhoan, nhanxet)
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
        res.send({ message: "Lỗi thuê nhà!!!" })
    })
};

async function thuenha(connectionString, id, taikhoan, nhanxet) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tkNguoiThue', sql.NVarChar(sql.MAX), taikhoan)
        request.input('idNha', sql.NVarChar(sql.MAX), id)
        request.input('nhanXet', sql.NVarChar(sql.MAX), nhanxet)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('themThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.huynha = async(req, res) => {
    let id = req.body.id

    huynha(dbConfig.connectionString, id)
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

async function huynha(connectionString, id) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('idNha', sql.NVarChar(sql.MAX), id)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xoaNha', (err, result) => {
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
    let tenNV = req.body.tenNV

    xacnhannha(dbConfig.connectionString, id, tenNV)
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

async function xacnhannha(connectionString, id, tenNV) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('idNha', sql.NVarChar(sql.MAX), id)
        request.input('tKhoanNV', sql.NVarChar(sql.MAX), tenNV)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('xacNhanNha', (err, result) => {
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
        request.execute('xemNNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xemLoaiNha = async(req, res) => {
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong

    xemLoaiNha(dbConfig.connectionString, index, sodong)
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

async function xemLoaiNha(connectionString, index, sodong) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.output('dem', sql.Int)
        request.execute('xemNLoaiNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}