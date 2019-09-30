module.exports = (app) => {
    const chinhanh = require('../controllers/chinhanh.controller');
    
    app.get('/chinhanh', chinhanh.xemChiNhanh);

}