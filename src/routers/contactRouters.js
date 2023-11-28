import { Router } from "express";
import { authMiddleWare } from "../middlewares/index.js";
import { contactControllers } from "../controllers/index.js";

const contactRouters = Router();

// create contact - method : POST - body : {contact details}
contactRouters.post(
  "/create",
  authMiddleWare.authenticateToken, // auth middleware for authenticating user
  contactControllers.addController
);

// get contact - method : GET - params : contactId
contactRouters.get(
  "/get-contact/:contactId",
  authMiddleWare.authenticateToken, // auth middleware for authenticating user
  contactControllers.getOneContact
);

// get all contact - method : GET
contactRouters.get(
  "/get-all-contacts",
  authMiddleWare.authenticateToken, // auth middleware for authenticating user
  contactControllers.getAllContact
);

// delete one  contact - method : delete - params : contactId
contactRouters.delete(
  "/delete-contact/:contactId",
  authMiddleWare.authenticateToken, // auth middleware for authenticating user
  contactControllers.deleteContact
);

// delete one  contact - method : delete - params : contactId
contactRouters.put(
  "/update-contact/:contactId",
  authMiddleWare.authenticateToken, // auth middleware for authenticating user
  contactControllers.updateContact
);

export default contactRouters;
