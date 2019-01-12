const ip = "192.168.0.25";
const port = "8081";

export const Endpoints = {
    login: `http://${ip}:${port}/login`,
    users: `http://${ip}:${port}/users/`,
    students: `http://${ip}:${port}/students/`,
    hrs: `http://${ip}:${port}/hrs/`,
};