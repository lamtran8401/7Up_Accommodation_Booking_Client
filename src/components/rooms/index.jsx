import { Empty, Pagination, Typography } from 'antd';
import Room from '../room';
import './style.scss';
import { useState } from 'react';

const Rooms = ({ title, data = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // Số phần tử hiển thị trên mỗi trang

    // Tính toán phần dữ liệu hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <Typography.Title level={3}>{title}</Typography.Title>
            {data.error ? (
                <Empty description={false} />
            ) : (
                <>
                    <ul className="rooms">
                        {currentData.map((item) => (
                            <li key={item.id}>
                                <Room item={item} />
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        current={currentPage}
                        total={data.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </>
            )}
        </>
    );
};

export default Rooms;
