import { Typography } from 'antd';
import Room from '../room';
import './style.scss';

const Rooms = ({ title, data }) => {
    return (
        <>
            <Typography.Title level={3}>{title}</Typography.Title>
            <ul className="rooms">
                {data.map((item, index) => (
                    <li key={index}>
                        <Room item={item} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Rooms;
