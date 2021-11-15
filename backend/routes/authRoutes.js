import Router from "express";
import {
  signIn_POST,
  signOut_GET,
  post_POST,
  postUpdate_PUT,
  newUser_POST,
  postsAll_GET,
} from "../controllers/authControllers.js";

const router = Router();

router.get(`/logout`, signOut_GET);
router.post(`/login`, signIn_POST);
router.post(`/new_user`, newUser_POST);
router.get(`/posts`, postsAll_GET);
router.post(`/post`, post_POST);
router.put(`/post`, postUpdate_PUT);

export { router as authRoutes };
