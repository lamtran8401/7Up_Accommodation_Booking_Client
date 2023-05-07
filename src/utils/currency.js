const convertToVND = (value) => {
    return value.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};

export default convertToVND;
