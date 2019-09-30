module.exports = (app) => {
    const user = require('../controllers/user.controller');
    
    app.post('/user/nguoithue', user.dangkinguoithue);

    app.post('/user/chunha', user.dangkichunha);

    app.post('/user/dangnhap', user.dangnhap);

    app.get('/user/nguoithue/thongtin', user.thongtinnguoithue);

    app.get('/user/chunha/thongtin', user.thongtinchunha);

    app.get('/user/nhanvien/thongtin', user.thongtinnhanvien);
}