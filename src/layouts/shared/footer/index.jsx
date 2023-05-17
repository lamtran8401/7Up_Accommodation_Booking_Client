import { Layout } from 'antd';
import './style.scss';

const Footer = () => {
    return (
        <Layout.Footer className="footer">
            <p className="footer-text">SEVEN UP GROUP - Người đại diện theo pháp luật:&nbsp;Seven Up</p>
            <p className="footer-text">
                GPDKKD:&nbsp;0312120782&nbsp;do&nbsp;sở&nbsp;KH&nbsp;&amp;&nbsp;ĐT&nbsp;TP.HCM&nbsp;cấp&nbsp;ngày&nbsp;11/05/2023
            </p>
            <p className="footer-text">Địa chỉ: VQCR+GP6, Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh</p>
            <p className="footer-text">
                Email:&nbsp;sevenup@gmail.com&nbsp;-&nbsp;Tổng&nbsp;đài&nbsp;CSKH:&nbsp;19003003&nbsp;(1.000đ/phút)
            </p>
        </Layout.Footer>
    );
};

export default Footer;
