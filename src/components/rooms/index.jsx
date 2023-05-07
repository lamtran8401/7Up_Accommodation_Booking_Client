import { Empty, Pagination, Typography } from 'antd';
import Room from '../room';
import './style.scss';

const Rooms = ({ title, data = [] }) => {
    return (
        <>
            <Typography.Title level={3}>{title}</Typography.Title>
            {data.error ? (
                <Empty description={false} />
            ) : (
                <>
                    <ul className="rooms">
                        {data.map((item) => (
                            <li key={item.id}>
                                <Room item={item} />
                            </li>
                        ))}
                    </ul>
                    <Pagination defaultCurrent={1} total={50} />
                </>
            )}
        </>
    );
};

export default Rooms;
