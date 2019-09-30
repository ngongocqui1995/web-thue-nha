module.exports = (app) => {
    const chunha = require('../controllers/chunha.controller');
    
    app.get('/chunha', chunha.xemChuNha);

    app.post('/chunha/xacnhan', chunha.xacnhanchunha)

    app.post('/chunha/huy', chunha.huychunha)

    app.get('/chunha/lichsu', chunha.xemlichsudangnha);
}