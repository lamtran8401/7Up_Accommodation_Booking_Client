const rooms = [
    {
        id: 1,
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
    {
        id: 2,
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
    {
        id: 3,
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
    {
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
    {
        id: 4,
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
    {
        id: 5,
        title: 'Cho thuê căn hộ 2 phòng ngủ mới ngay khu Bàu Cát - Tân Bình',
        image: 'https://cdn.chotot.com/G--tLjv6ESx37KzNdChqmdX_gH9ViyuLlBu69hdX7dM/preset:view/plain/f93b15a0b0d54f41d4fa1a65729b33ee-2819852998017697280.jpg',
        price: 3200000,
        location: '123 Main St',
        area: 30,
        host: 'John Doe',
    },
];

const loadRooms = () => {
    return new Response(JSON.stringify(rooms), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export default loadRooms;
