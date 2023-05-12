import { Row, Col, Card, Avatar, Divider, Rate, List, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './roomdetail.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const hostInfo = {
    name: 'John Doe',
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    birthDate: 'Joined in 2015',
    locations: '100%',
};

const roomInfo = {
    title: 'Luxury Apartment in Downtown',
    location: '123 Main Street, Anytown, USA',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere purus eu ante dictum, a tincidunt velit bibendum. Sed at diam id nisl iaculis maximus. Aliquam eleifend euismod dui sed tincidunt. Morbi eu est sit amet nulla pellentesque commodo. Aliquam et ante vel nisl lobortis tincidunt. Ut id ipsum id lectus ultrices tincidunt nec vitae dolor. Praesent eget lorem augue. Morbi feugiat nisi non mauris euismod, vel sodales justo malesuada. Aliquam eget eros turpis.',
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Gym'],
    price: '$150 per night',
    rating: 4.5,
    reviews: [
        {
            name: 'Jane Doe',
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            comment: 'Great place to stay, highly recommend!',
            rating: 4.5,
            date: 'May 1, 2023',
        },
        {
            name: 'John Smith',
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            comment: 'Amazing experience, will definitely stay here again!',
            rating: 5,
            date: 'April 29, 2023',
        },
    ],
};

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [listImages, setListImages] = useState([]);

    const getImage = (name) => {
        return `https://firebasestorage.googleapis.com/v0/b/accommodation-306b8.appspot.com/o/files%2F${name}?alt=media`;
    };
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/rooms/${id}`)
            .then((response) => {
                console.log(response.data);
                if (response.data.listImages > 0) {
                    let images = [];
                    for (var x of response.data.listImages) {
                        images.push(getImage(x));
                    }
                    setListImages(images);
                }
                setRoom(response.data);
            })
            .catch((err) => {
                console.log(' Lỗi' + err);
            });
    }, []);
    return (
        <div className="room-detail">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card cover={<img alt="room" src={room == null ? '' : getImage(room.listImages[0])} />}>
                        <List
                            grid={{ gutter: 16, column: 5 }}
                            dataSource={listImages}
                            renderItem={(item) => (
                                <List.Item>
                                    <img alt="room" src={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card>
                        <div className="host-info">
                            <Avatar size={64} icon={<UserOutlined />} src={hostInfo.avatar} />
                            <div>
                                <Title level={4}>{room == null ? '' : room.hostResponse.name}</Title>
                                <Text>
                                    Ngày đăng:
                                    {room == null ? '' : new Date(room.createDate).toISOString().split('T')[0]}
                                </Text>
                                <br />
                                <Text>CMND: {room == null ? '' : room.hostResponse.idCard}</Text>
                            </div>
                        </div>
                        <Button type="primary">{room == null ? '' : room.hostResponse.phoneNumber}</Button>
                        <Divider />
                        <div className="room-info">
                            <Title level={3}>{room == null ? '' : room.title}</Title>
                            <Typography.Title level={5}>
                                {room == null ? '' : `${room.rentCost} đ/tháng`} -{' '}
                                {room == null ? '' : `${room.size} m²`}
                            </Typography.Title>
                            <Text>
                                Địa chỉ:{' '}
                                {room == null
                                    ? ''
                                    : `${room.location.houseNumber}, ${room.location.street}, ${room.location.ward}, ${room.location.district}, ${room.location.city}`}
                            </Text>
                            <br />
                            <Text>Loại: {room == null ? '' : `${room.type}`}</Text>
                            <br />
                            <Text>Số phòng ngủ: {room == null ? '' : `${room.bedRoomNumber}`}</Text>
                            <br />
                            <Text>Số phòng tắm: {room == null ? '' : `${room.bathRoomNumber}`}</Text>
                            <br />
                            <Typography.Title level={6}>
                                {room == null ? '' : `${room.rentCost} đ/tháng`} -{' '}
                                {room == null ? '' : `${room.size} m²`}
                            </Typography.Title>
                            <Rate disabled defaultValue={roomInfo.rating} />
                            <Text>{` ${roomInfo.rating.toFixed(1)} (${roomInfo.reviews.length} reviews)`}</Text>
                            <br />

                            <br />
                            <br />
                            <Text>{room == null ? '' : room.description}</Text>
                            <br />
                            <br />
                            <Title level={4}>Amenities</Title>
                            <Text>{roomInfo.amenities.join(', ')}</Text>
                        </div>
                        <Divider />
                        <div className="reviews">
                            <Title level={4}>Reviews</Title>
                            <List
                                itemLayout="vertical"
                                dataSource={roomInfo.reviews}
                                renderItem={(review) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={review.avatar} />}
                                            title={review.name}
                                            description={`${review.rating} stars - ${review.date}`}
                                        />
                                        {review.comment}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RoomDetail;
