// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.xemlichsugiaodich = async(req, res) => {
    let taikhoan = req.query.taikhoan    
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong
    let tinhtrang = Number(req.query.tinhtrang)

    xemlichsugiaodich(dbConfig.connectionString, taikhoan, index, sodong, tinhtrang)
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

async function xemlichsugiaodich(connectionString, taikhoan, index, sodong, tinhtrang) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('tkNThue', sql.NVarChar(sql.MAX), taikhoan)
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.input('tinhTrang', sql.Int, tinhtrang)
        request.output('dem', sql.Int)
        request.execute('xemNThueTheoTK', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}

exports.xemNguoiThue = async(req, res) => {
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong
    let tinhtrang = Number(req.query.tinhtrang)

    xemNguoiThue(dbConfig.connectionString, index, sodong, tinhtrang)
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

async function xemNguoiThue(connectionString, index, sodong, tinhtrang) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.input('tinhTrang', sql.Int, tinhtrang)
        request.output('dem', sql.Int)
        request.execute('xemNNguoiThue', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}