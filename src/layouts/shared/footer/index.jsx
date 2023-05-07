import { Layout } from 'antd';
import './style.scss';

const Footer = () => {
    return (
        <Layout.Footer className="footer">
            <p className="footer-text">
                CÔNG TY TNHH CHỢ TỐT - Người đại diện theo pháp luật:&nbsp;Nguyễn&nbsp;Trọng&nbsp;Tấn
            </p>
            <p className="footer-text">
                GPDKKD:&nbsp;0312120782&nbsp;do&nbsp;sở&nbsp;KH&nbsp;&amp;&nbsp;ĐT&nbsp;TP.HCM&nbsp;cấp&nbsp;ngày&nbsp;11/01/2013
            </p>
            <p className="footer-text">
                Địa chỉ: Số 2 Ngô Đức Kế, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam
            </p>
            <p className="footer-text">
                Email:&nbsp;trogiup@chotot.vn&nbsp;-&nbsp;Tổng&nbsp;đài&nbsp;CSKH:&nbsp;19003003&nbsp;(1.000đ/phút)
            </p>
        </Layout.Footer>
    );
};

export default Footer;
