import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Image, Typography } from 'antd';
import './managePost.scss';
import axios from 'axios';
import { errorMessageCounDown, successMessageCounDown } from '../../config/utils';
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
    const mapRoomType = new Map();
    mapRoomType.set('APARTMENT', 'Chung cư');
    mapRoomType.set('MOTEL', 'Phòng trọ');
    mapRoomType.set('HOUSE', 'Nhà nguyên căn');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [modalMessage, contextHolderMessage] = Modal.useModal();
    const columns = [
        { title: 'Mã', dataIndex: 'id', key: 'id' },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',

            render: (image) => <Image width={50} src={image} />,
        },
        { title: 'Giá thuê(đ/tháng)', dataIndex: 'rentCost', key: 'rentCost', width: '15%' },
        {
            title: 'Đia chỉ',
            dataIndex: 'location',
            key: 'location',
            width: '20%',
        },
        { title: 'Loại', dataIndex: 'type', key: 'type' },
        { title: 'Ngày đăng', dataIndex: 'createDate', key: 'createDate' },
        { title: 'Người đăng', dataIndex: 'host', key: 'host' },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'action',
            render: (_, record) => (
                <>
                    {record.activeStatus == 'ACTIVE' ? (
                        <Popconfirm title="Bạn có muốn khoá tin này?" onConfirm={() => deleteRoom(record.id)}>
                            <Button type="danger">Khoá</Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm title="Bạn có muốn mở khoá tin này?" onConfirm={() => enableRoom(record.id)}>
                            <Button type="danger">Mở khoá</Button>
                        </Popconfirm>
                    )}
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
            const updatedData = data.map((room) => (room.id === currentRoom.id ? { ...room, ...values } : room));
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

    const deleteRoom = (id) => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/rooms/disable/${id}`)
            .then((response) => {
                const updatedData = rooms.map((item) => {
                    if (item.id === id) {
                        return { ...item, activeStatus: 'INACTIVE' }; // Thay đổi giá trị của phần tử có id là 2
                    }
                    return item;
                });
                setRooms(updatedData);
                successMessageCounDown(5, 'Đã khoá tin', modalMessage);
            })
            .catch((err) => {
                errorMessageCounDown(5, 'Khoá tin thất bại', modalMessage);
            });
    };
    const enableRoom = (id) => {
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/rooms/enable/${id}`)
            .then((response) => {
                const updatedData = rooms.map((item) => {
                    if (item.id === id) {
                        return { ...item, activeStatus: 'ACTIVE' }; // Thay đổi giá trị của phần tử có id là 2
                    }
                    return item;
                });
                setRooms(updatedData);
                successMessageCounDown(5, 'Đã mở khoá tin', modalMessage);
            })
            .catch((err) => {
                errorMessageCounDown(5, 'Mở khoá tin thất bại', modalMessage);
            });
    };
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
            .get(`${import.meta.env.VITE_API_BASE_URL}/rooms/all`)
            .then((response) => {
                const dataResponse = response.data;
                const rooms = dataResponse.map((room) => {
                    return {
                        id: room.id,
                        title: room.title,
                        bathRoomNumber: room.bathRoomNumber,
                        bedRoomNumber: room.bedRoomNumber,
                        deposit: room.deposit,
                        description: room.description,
                        activeStatus: room.activeStatus,
                        image: getImage(room.listImages[0]),
                        rentCost: formatCurrent(room.rentCost),
                        type: mapRoomType.get(room.type),
                        location: `${room.location.houseNumber}, ${room.location.street}, ${room.location.ward}, ${room.location.district}, ${room.location.city}`,
                        createDate: new Date(room.createDate).toLocaleDateString('vi-VN'),
                        host: room.hostResponse.name,
                    };
                });
                setRooms(rooms);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const RoomForm = ({ onFinish, initialValues }) => (
        <Form onFinish={onFinish} initialValues={initialValues}>
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Ảnh" name="image" rules={[{ required: true, message: 'Please enter the image URL' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Giá phòng" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="location"
                rules={[{ required: true, message: 'Please enter the location' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Loại" name="area" rules={[{ required: true, message: 'Please enter the area' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Người đăng" name="host" rules={[{ required: true, message: 'Please enter the host' }]}>
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
                Thêm phòng
            </Button>
            <Table dataSource={rooms} columns={columns} />

            <Modal
                title={currentRoom ? 'Edit Room' : 'Add Room'}
                visible={modalVisible}
                onCancel={closeModal}
                footer={null}
            >
                <RoomForm onFinish={saveRoom} initialValues={currentRoom} />
            </Modal>
            {contextHolderMessage}
        </div>
    );
};

export default ManagePost;
