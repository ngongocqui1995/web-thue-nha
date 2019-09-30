import axios from 'axios'

export default class {

    static async dangkithuenha (id, taikhoan, nhanxet) {
        const res = await axios.post(`http://localhost:4098/nha/thuenha`, {
            id, taikhoan, nhanxet
        })
        const data = res.data
    
        return data
    }

    static async xacnhanthuenha (id, taikhoanNT) {
        const res = await axios.post(`http://localhost:4098/thuenha/xacnhan`, {
            id, taikhoanNT
        })
        const data = res.data
    
        return data
    }

    static async huythuenha (id, taikhoanNT) {
        const res = await axios.post(`http://localhost:4098/thuenha/huy`, {
            id, taikhoanNT
        })
        const data = res.data
    
        return data
    }

    static async xacnhannha (id, tenNV) {
        const res = await axios.post(`http://localhost:4098/nha/xacnhan`, {
            id, tenNV
        })
        const data = res.data
    
        return data
    }

    static async huynha (id) {
        const res = await axios.post(`http://localhost:4098/nha/huy`, {
            id
        })
        const data = res.data
    
        return data
    }

    static async huychunha (tenCN) {
        const res = await axios.post(`http://localhost:4098/chunha/huy`, {
            tenCN
        })
        const data = res.data
    
        return data
    }
    
    static async xacnhanchunha (tenCN, tenNV) {
        const res = await axios.post(`http://localhost:4098/chunha/xacnhan`, {
            tenCN, tenNV
        })
        const data = res.data
    
        return data
    }

    static async layDanhSachThueNha (indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/thuenha`, {
            params: {
                indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async layDanhSachNguoiThue (indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/nguoithue`, {
            params: {
                indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async layDanhSachChuNha (indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/chunha`, {
            params: {
                indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async layLichSuGiaoDich (taikhoan, indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/nguoithue/lichsu`, {
            params: {
                taikhoan, indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async layLichSuDangNha (taikhoan, indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/chunha/lichsu`, {
            params: {
                taikhoan, indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async layDanhSachChiNhanh (indexPage, sodong) {
        const res = await axios.get(`http://localhost:4098/chinhanh`, {
            params: {
                indexPage, sodong
            }
        })
        const data = res.data
    
        return data
    }
  
    static async layDanhSachNha (indexPage, sodong, tinhtrang) {
        const res = await axios.get(`http://localhost:4098/nha`, {
            params: {
                indexPage, sodong, tinhtrang
            }
        })
        const data = res.data
    
        return data
    }

    static async dangNha (diaChi, soPhong, tienthue1Thang, taikhoan, idNha) {
        const res = await axios.post(`http://localhost:4098/nha/dangnha`, {
            diaChi, soPhong, tienthue1Thang, taikhoan, idNha
        })
        const data = res.data
    
        return data
    }

    static async layDanhSachLoaiNha (indexPage, sodong) {
        const res = await axios.get(`http://localhost:4098/nha/loainha`, {
            params: {
                indexPage, sodong
            }
        })
        const data = res.data
    
        return data
    }

    static async dangKiNguoiThue (username, password, ten, diaChi, sdt) {
        const res = await axios.post(`http://localhost:4098/user/nguoithue`, {
            username, password, ten, diaChi, sdt
        })
        const data = res.data
    
        return data
    }

    static async dangKiChuNha (username, password, ten, diaChi, sdt) {
        const res = await axios.post(`http://localhost:4098/user/chunha`, {
            username, password, ten, diaChi, sdt
        })
        const data = res.data
    
        return data
    }

    static async dangNhap (username, password) {
        const res = await axios.post(`http://localhost:4098/user/dangnhap`, {
            username, password
        })
        const data = res.data
    
        return data
    }

    static async layThongTinNguoiThue (username) {
        const res = await axios.get(`http://localhost:4098/user/nguoithue/thongtin`, {
            params: {
                username
            }
        })
        const data = res.data
    
        return data
    }

    static async layThongTinChuNha (username) {
        const res = await axios.get(`http://localhost:4098/user/chunha/thongtin`, {
            params: {
                username
            }
        })
        const data = res.data
    
        return data
    }

    static async layThongTinNhanVien (username) {
        const res = await axios.get(`http://localhost:4098/user/nhanvien/thongtin`, {
            params: {
                username
            }
        })
        const data = res.data
    
        return data
    }
}