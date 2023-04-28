import convertToVND from '@/utils/currency';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const fakeImg =
    'https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/25/0d8b012f-c26e-450f-8d40-c161d613bac5_1682408610.jpg';

const Room = ({ item }) => {
    const navigate = useNavigate();
    const { Meta } = Card;
    const { Paragraph } = Typography;
    // const { title, image, price, location, size } = item;
    const { title, listImages, rentCost, location, size } = item;

    const image = `https://firebasestorage.googleapis.com/v0/b/accommodation-306b8.appspot.com/o/files%2F${listImages[0]}?alt=media`;

    const handleClick = () => {
        navigate(`/rooms/${item.id}`);
    };
    return (
        <Card className="room" onClick={handleClick} cover={<img src={image ? image : fakeImg} alt={title} />}>
            <Meta title={title} />
            <Paragraph className="room__area" type="secondary">
                {size} m²
            </Paragraph>
            <Paragraph className="room__price">{convertToVND(rentCost)}/ tháng</Paragraph>
            <Paragraph className="room__location" type="secondary">
                <MapPinIcon className="icon" />
                {`${location.district}, ${location.city}`}
            </Paragraph>
        </Card>
    );
};

export default Room;
