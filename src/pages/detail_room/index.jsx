
import { Row, Col, Card, Avatar, Divider, Rate, List, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './roomdetail.scss';

const { Title, Text } = Typography;

const photoList = [
 'https://picsum.photos/id/1018/600/400',
'https://picsum.photos/id/1020/600/400',
'https://picsum.photos/id/1035/600/400',
];

const hostInfo = {
  name: 'John Doe',
  avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  joined: 'Joined in 2015',
  languages: ['English', 'Spanish'],
  responseTime: 'Within an hour',
  responseRate: '100%',
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
  return (
    <div className="room-detail">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card cover={<img alt="room" src={photoList[0]} />}>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={photoList}
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
            <Title level={4}>{hostInfo.name}</Title>
            <Text>{hostInfo.joined}</Text>
            <br />
            <Text>{hostInfo.languages.join(', ')}</Text>
            <br />
            <Text>Response time: {hostInfo.responseTime}</Text>
            <br />
            <Text>Response rate: {hostInfo.responseRate}</Text>
          </div>
        </div>
          <Button type="primary">Alo: 0123456789</Button>
        <Divider />
        <div className="room-info">
          <Title level={3}>{roomInfo.title}</Title>
          <Text>{roomInfo.location}</Text>
          <br />
          <Rate disabled defaultValue={roomInfo.rating} />
          <Text>{` ${roomInfo.rating.toFixed(1)} (${roomInfo.reviews.length} reviews)`}</Text>
          <br />
          <Text>{roomInfo.price}</Text>
          <br />
          <br />
          <Text>{roomInfo.description}</Text>
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