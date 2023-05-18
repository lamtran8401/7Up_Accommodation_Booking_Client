import  { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import './managePost.scss';
const ManagePost = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: 'Room 1',
      image: 'room1.jpg',
      price: 100,
      location: 'City 1',
      area: '100 sqft',
      host: 'Host 1',
    },
    {
      id: 2,
      title: 'Room 2',
      image: 'room2.jpg',
      price: 150,
      location: 'City 2',
      area: '120 sqft',
      host: 'Host 2',
    },
   
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Image', dataIndex: 'image', key: 'image' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Area', dataIndex: 'area', key: 'area' },
    { title: 'Host', dataIndex: 'host', key: 'host' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => editRoom(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this room?"
            onConfirm={() => deleteRoom(record)}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const showModal = () => {
    setCurrentRoom(null);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveRoom = (values) => {
    if (currentRoom) {
      // Update existing room
      const updatedData = data.map((room) =>
        room.id === currentRoom.id ? { ...room, ...values } : room
      );
      setData(updatedData);
    } else {
      // Add new room
      const newRoom = { id: data.length + 1, ...values };
      setData([...data, newRoom]);
    }
    setModalVisible(false);
  };

  const editRoom = (room) => {
    setCurrentRoom(room);
    setModalVisible(true);
  };

  const deleteRoom = (room) => {
    const filteredData = data.filter((r) => r.id !== room.id);
    setData(filteredData);
  };

  const RoomForm = ({ onFinish, initialValues }) => (
    <Form onFinish={onFinish} initialValues={initialValues}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: 'Please enter the image URL' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please enter the location' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Area"
        name="area"
        rules={[{ required: true, message: 'Please enter the area' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Host"
        name="host"
        rules={[{ required: true, message: 'Please enter the host' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Room
      </Button>
      <Table dataSource={data} columns={columns} />

      <Modal
        title={currentRoom ? 'Edit Room' : 'Add Room'}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <RoomForm onFinish={saveRoom} initialValues={currentRoom} />
      </Modal>
    </div>
  );
};

export default ManagePost;
