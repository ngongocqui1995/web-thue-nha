module.exports = (app) => {
    const nguoithue = require('../controllers/nguoithue.controller');
    
    app.get('/nguoithue', nguoithue.xemNguoiThue);

    app.get('/nguoithue/lichsu', nguoithue.xemlichsugiaodich);
}