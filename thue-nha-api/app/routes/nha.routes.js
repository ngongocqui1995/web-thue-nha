module.exports = (app) => {
    const nha = require('../controllers/nha.controller');
    
    app.get('/nha', nha.xemNha);

    app.get('/nha/loainha', nha.xemLoaiNha);

    app.post('/nha/xacnhan', nha.xacnhannha);

    app.post('/nha/huy', nha.huynha);

    app.post('/nha/thuenha', nha.thuenha);

    app.post('/nha/dangnha', nha.dangnha);
}