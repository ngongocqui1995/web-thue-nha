module.exports = (app) => {
    const nha = require('../controllers/thuenha.controller');
    
    app.get('/thuenha', nha.xemNha);

    app.post('/thuenha/xacnhan', nha.xacnhannha);

    app.post('/thuenha/huy', nha.huynha);
}