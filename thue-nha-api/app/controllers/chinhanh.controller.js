// Configuring the database
const dbConfig = require('../../config/database.config.js');
const sql = require("mssql/msnodesqlv8");

exports.xemChiNhanh = async(req, res) => {
    let indexPage = Number(req.query.indexPage)
    let sodong = Number(req.query.sodong)
    let index = indexPage === 0 ? 1 : indexPage * sodong

    xemChiNhanh(dbConfig.connectionString, index, sodong)
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

async function xemChiNhanh(connectionString, index, sodong) {
    return new Promise(async(resolve, reject) => {
        await sql.connect(connectionString)
        const request = new sql.Request()
        request.input('dbatdau', sql.Int, index)
        request.input('dlay', sql.Int, sodong)
        request.output('dem', sql.Int)
        request.execute('xemNChiNhanh', (err, result) => {
            if (err) {
                sql.close()
                reject(err);
            }
            sql.close()
            resolve(result); 
        })
    })
}