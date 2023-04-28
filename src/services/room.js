import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const loadRooms = () => {
    return axios
        .get(`${baseURL}/rooms`)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        });
};
