import convertToVND from '@/utils/currency';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Room = ({ item }) => {
    const navigate = useNavigate();
    const { Meta } = Card;
    const { Paragraph } = Typography;
    const { title, image, price, location, area } = item;

    const handleClick = () => {
        navigate(`/rooms/${item.id}`);
    };
    return (
        <Card className="room" onClick={handleClick} cover={<img src={image} alt={title} />}>
            <Meta title={title} />
            <Paragraph className="room__area" type="secondary">
                {area} m²
            </Paragraph>
            <Paragraph className="room__price">{convertToVND(price)}/ tháng</Paragraph>
            <Paragraph className="room__location" type="secondary">
                <MapPinIcon className="icon" />
                {location}
            </Paragraph>
        </Card>
    );
};

export default Room;
