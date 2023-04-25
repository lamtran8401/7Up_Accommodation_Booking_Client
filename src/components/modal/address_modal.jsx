import { Button, Checkbox, Form, Input, Typography, Select, Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const AddressModal = ({ open, onCancel, onOk }) => {
    const [cities, setCities] = useState([]);
    const [districts, setDistrists] = useState([]);
    const [wards, setWards] = useState([]);
    const [formAddress] = Form.useForm();

    const hanldeSubmit = (values) => {
        onOk(values);
    };
    useEffect(() => {
        axios
            .get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => console.log(error));
    }, []);
    const hanldeChangeCity = (value) => {
        formAddress.setFieldsValue({
            district: null,
            ward: null,
        });
        const code = value.split('-')[0];
        axios
            .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
            .then((response) => {
                setDistrists(response.data.districts);
            })
            .catch((error) => console.log(error));
    };
    const hanldeChangeDistrict = (value) => {
        formAddress.setFieldsValue({
            ward: null,
        });
        const code = value.split('-')[0];
        axios
            .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
            .then((response) => {
                setWards(response.data.wards);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Modal
            title="Địa chỉ"
            open={open}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={onCancel}
        >
            <Form form={formAddress} layout="vertical" onFinish={hanldeSubmit}>
                <Form.Item
                    name="city"
                    label="Tỉnh, thành phố"
                    className="form__item mb-1"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn tỉnh, thành phố!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn tỉnh thành phố"
                        optionFilterProp="children"
                        onChange={hanldeChangeCity}
                    >
                        {cities.map((city) => (
                            <Select.Option key={city.code} value={`${city.code}-${city.name}`}>
                                {city.name.replace('Tỉnh', '')}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="district"
                    label="Quận, huyện"
                    className="form__item mb-1"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn loại quận, huyện!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn tỉnh quận, huyện"
                        optionFilterProp="children"
                        onChange={hanldeChangeDistrict}
                    >
                        {districts.map((district) => (
                            <Select.Option key={district.code} value={`${district.code}-${district.name}`}>
                                {district.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="ward"
                    label="Phường, xã"
                    className="form__item mb-1"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn phường, xã' }]}
                >
                    <Select showSearch placeholder="Chọn tỉnh xã, phường" optionFilterProp="children">
                        {wards.map((ward) => (
                            <Select.Option key={ward.code} value={ward.name}>
                                {ward.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="street"
                    label="Đường"
                    className="form__item mb-1"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng nhập đường' }]}
                >
                    <Input placeholder="Nhập đường"></Input>
                </Form.Item>
                <Form.Item
                    name="house_number"
                    label="Số nhà"
                    className="form__item"
                    required={false}
                    rules={[{ required: true, message: 'Vui lòng chọn số nhà!' }]}
                >
                    <Input
                        placeholder="Nhập số nhà"
                        rules={[
                            { required: true, message: 'Please input your name!' },
                            { type: 'number', message: 'Vui lòng nhập số' },
                        ]}
                    ></Input>
                </Form.Item>
                <Form.Item className="form__item">
                    <Button className="form__btn" type="primary" htmlType="submit">
                        Xong
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default AddressModal;
