// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.thongtinnhanvien = async(req, res) => {
    let username = req.query.username

    thongtinnhanvien(dbConfig.connectionString, username)
    .then((result) => {
        let data = result.recordset

        res.send({ 
            data: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ 
            data: []
        })
    })
};

exports.thongtinnguoithue = async(req, res) => {
    let username = req.query.username

    thongtinnguoithue(dbConfig.connectionString, username)
    .then((result) => {
        let data = result.recordset

        res.send({ 
            data: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ 
            data: []
        })
    })
};

exports.thongtinchunha = async(req, res) => {
    let username = req.query.username

    thongtinchunha(dbConfig.connectionString, username)
    .then((result) => {
        let data = result.recordset

        res.send({ 
            data: data
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ 
            data: []
        })
    })
};

exports.dangnhap = async(req, res) => {
    let username = req.body.username
    let password = req.body.password

    dangnhap(dbConfig.connectionString, username, password)
    .then((result) => {
        let { out } = result.output
        let split = out.split(",")
        let permission = split[1] ? split[1] : ""
        let message = ""
        let state = "fail"
        if (split[0] && split[0] == 1) {
            state = "ok"
            message = split[2] ? split[2] : ""
        } else {
            state = "fail"
            message = split[1] ? split[1] : ""
        }

        res.send({ 
            state: state,
            permission: permission,
            message: message.trim()
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ 
            state: "fail",
            permission: "",
            message: "Lỗi đăng kí tài khoản thuê nhà!!!" 
        })
    })
};

exports.dangkinguoithue = async(req, res) => {
    let username = req.body.username
    let password = req.body.password
    let ten = req.body.ten
    let diaChi = req.body.diaChi
    let sdt = req.body.sdt

    dangkinguoithue(dbConfig.connectionString, username, password, ten, diaChi, sdt)
    .then((result) => {
        let { out } = result.output
        let split = out.split(",")
        let message = split[1] ? split[1] : ""

        res.send({ 
            message: message
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ message: "Lỗi đăng kí tài khoản thuê nhà!!!" })
    })
};

exports.dangkichunha = async(req, res) => {
    let username = req.body.username
    let password = req.body.password
    let ten = req.body.ten
    let diaChi = req.body.diaChi
    let sdt = req.body.sdt

    dangkichunha(dbConfig.connectionString, username, password, ten, diaChi, sdt)
    .then((result) => {
        let { out } = result.output
        let split = out.split(",")
        let message = split[1] ? split[1] : ""

        res.send({ 
            message: message
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({ message: "Lỗi đăng kí tài khoản thuê nhà!!!" })
    })
};

async function thongtinchunha(connectionString, username) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoanChuNha', sql.NVarChar(sql.MAX), username)
        request.execute('xem1ChuNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

async function thongtinnguoithue(connectionString, username) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoanNguoiThue', sql.NVarChar(sql.MAX), username)
        request.execute('xem1NguoiThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

async function thongtinnhanvien(connectionString, username) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoanNhanVien', sql.NVarChar(sql.MAX), username)
        request.execute('xem1NhanVien', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

async function dangnhap(connectionString, username, password) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoan', sql.NVarChar(sql.MAX), username)
        request.input('PASS', sql.NVarChar(sql.MAX), password)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('dangNhap', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

async function dangkichunha(connectionString, username, password, ten, diaChi, sdt) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoan', sql.NVarChar(sql.MAX), username)
        request.input('PASS', sql.NVarChar(sql.MAX), password)
        request.input('hTen', sql.NVarChar(sql.MAX), ten)
        request.input('dChi', sql.NVarChar(sql.MAX), diaChi)
        request.input('SDT', sql.NVarChar(sql.MAX), sdt)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('dkChuNha', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

async function dangkinguoithue(connectionString, username, password, ten, diaChi, sdt) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tKhoan', sql.NVarChar(sql.MAX), username)
        request.input('PASS', sql.NVarChar(sql.MAX), password)
        request.input('hTen', sql.NVarChar(sql.MAX), ten)
        request.input('dChi', sql.NVarChar(sql.MAX), diaChi)
        request.input('SDT', sql.NVarChar(sql.MAX), sdt)
        request.output('out', sql.NVarChar(sql.MAX))
        request.execute('dkNguoiThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}