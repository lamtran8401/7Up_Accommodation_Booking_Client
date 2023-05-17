import { Row, Col, Card, Avatar, Divider, Rate, List, Typography, Button, Carousel } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './roomdetail.scss';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@/components/loading_page';

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
            comment: 'OK',
            rating: 4.5,
            date: 'May 1, 2023',
        },
        {
            name: 'John Smith',
            avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
            comment: 'Tốt!',
            rating: 5,
            date: 'April 29, 2023',
        },
    ],
};
const mapRoomType = new Map();
mapRoomType.set('APARTMENT', 'Chung cư');
mapRoomType.set('MOTEL', 'Phòng trọ');
mapRoomType.set('HOUSE', 'Nhà nguyên căn');
const mapInteriorStatus = new Map();
mapInteriorStatus.set('FULL', 'Đầy đủ');
mapInteriorStatus.set('EMPTY', 'Phòng trống');
mapInteriorStatus.set('LUXURY', 'Cao cấp');
const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [listImages, setListImages] = useState([]);

    const getImage = (name) => {
        return `https://firebasestorage.googleapis.com/v0/b/accommodation-306b8.appspot.com/o/files%2F${name}?alt=media`;
    };
    const formatCurrent = (amount) => {
        return amount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/rooms/${id}`)
            .then((response) => {
                setRoom(response.data);
                const imgSrc = response.data.listImages;
                let images = [];
                imgSrc.forEach((img) => images.push(getImage(img)));
                setListImages(images);
            })
            .catch((err) => {
                console.log(' Lỗi' + err);
            });
    }, []);

    return (
        <div className="room-detail">
            {room == null ? (
                ''
            ) : (
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Carousel autoplay>
                            {listImages.map((item) => (
                                <Card cover={<img alt="room" src={item} />}></Card>
                            ))}
                        </Carousel>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card>
                            <div className="host-info">
                                <Avatar size={64} icon={<UserOutlined />} src={hostInfo.avatar} />
                                <div>
                                    <Title level={4}>{room.hostResponse.name}</Title>
                                    <Text>Ngày đăng: {new Date(room.createDate).toLocaleDateString('vi-VN')}</Text>
                                    <br />
                                    <Text>CMND: {room.hostResponse.idCard}</Text>
                                </div>
                            </div>
                            <Button type="primary">{room.hostResponse.phoneNumber}</Button>
                            <Divider />
                            <div className="room-info">
                                <Title level={3}>{room.title}</Title>

                                <Typography.Title level={5}>
                                    {`${formatCurrent(room.rentCost)}/tháng`} - {`${room.size} m²`}
                                </Typography.Title>
                                <br />
                                <Text>
                                    <span style={{ color: 'black' }}>Địa chỉ: </span>
                                    {`${room.location.houseNumber}, ${room.location.street}, ${room.location.ward}, ${room.location.district}, ${room.location.city}`}
                                </Text>
                                <br />
                                <Text>
                                    {' '}
                                    <span style={{ color: 'black' }}>Tiền cọc: </span>{' '}
                                    {`${formatCurrent(room.deposit)}`}
                                </Text>
                                <br />
                                <Text>
                                    {' '}
                                    <span style={{ color: 'black' }}>Loại: </span> {`${mapRoomType.get(room.type)}`}
                                </Text>
                                <br />
                                <Text>
                                    {' '}
                                    <span style={{ color: 'black' }}>Nội thất: </span>{' '}
                                    {`${mapInteriorStatus.get(room.interiorStatus)}`}
                                </Text>
                                <br />
                                <Text>
                                    {' '}
                                    <span style={{ color: 'black' }}>Số phòng ngủ: </span> {`${room.bedRoomNumber}`}
                                </Text>
                                <br />
                                <Text>
                                    {' '}
                                    <span style={{ color: 'black' }}>Số phòng tắm: </span> {`${room.bathRoomNumber}`}
                                </Text>
                                <br />
                                <Rate disabled defaultValue={roomInfo.rating} />
                                <Text>{` ${roomInfo.rating.toFixed(1)} (${roomInfo.reviews.length} reviews)`}</Text>
                                <br />

                                <br />
                                <Title level={4}>Mô tả</Title>
                                <Text>{room.description}</Text>
                            </div>
                            <Divider />
                            <div className="reviews">
                                <Title level={4}>Nhận xét</Title>
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
            )}
        </div>
    );
};

export default RoomDetail;
