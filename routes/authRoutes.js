import express from "express";


import {addUser,updateUser,deleteUser,rechercheUser,listerUsers} from "../services/userService.js";

const app = express();
