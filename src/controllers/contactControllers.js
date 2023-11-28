import { apiResponse } from "../utils/index.js";
import { authModel, contactModel } from "../models/index.js";

export const contact = {
  addController: async (req, res) => {
    try {
      const user = await authModel.findById(req?.params?.userId);
      if (!user) return apiResponse.error(res, 404, "User not found");

      const contactBody = { ...req.body, user: user?._id };
      const contact = await contactModel(contactBody);

      user?.contact?.push(contact._id); // push the contact into the user collection
      await user.save(); // save updated user contact
      await contact.save(); // save the contact

      return apiResponse.success(res, 201, {
        message: "successfully added",
        contact,
      });
    } catch (err) {
      return apiResponse.handleDuplicateKeyError(res, err);
    }
  },

  getOneContact: async (req, res) => {
    try {
      const userId = req.params.userId;
      const contactId = req.params.contactId;

      const singleContact = await contactModel.findOne({
        _id: contactId,
        user: userId,
      });

      if (!singleContact)
        return apiResponse.error(res, 404, {
          message: "Contact does not exist",
        });

      return apiResponse.success(res, 200, { contact: singleContact });
    } catch (err) {
      return apiResponse.serverError(res);
    }
  },

  getAllContact: async (req, res) => {
    try {
      const userContacts = await contactModel.find({
        user: req?.params?.userId,
      });
      const contacts = { total: userContacts?.length, contacts: userContacts };
      return apiResponse.success(res, 200, contacts);
    } catch (err) {
      return apiResponse.serverError(res);
    }
  },

  deleteContact: async (req, res) => {
    try {
      const userId = req?.params?.userId;
      const contactId = req?.params?.contactId;

      const singleContact = await contactModel.findOne({
        _id: contactId,
        user: userId,
      });

      if (!singleContact)
        return apiResponse.error(res, 404, {
          message: "Contact does not exist or already deleted",
        });

      await contactModel.findByIdAndDelete(contactId);

      const user = await authModel.findById(userId);
      if (user) {
        user?.contact?.pull(contactId);
        await user.save();
      }

      return apiResponse.success(res, 200, {
        message: "Contact deleted successfully",
      });
    } catch (err) {
      return apiResponse.serverError(res);
    }
  },
  updateContact: async (req, res) => {
    try {
      const userId = req?.params?.userId;
      const contactId = req?.params?.contactId;

      const updatedContactData = req.body;

      // Find the contact for the specified user ID
      const singleContact = await contactModel.findOne({
        _id: contactId,
        user: userId,
      });

      if (!singleContact)
        return apiResponse.error(res, 404, {
          message: "Contact not found",
        });

      // Update the contact with the new data
      Object.assign(singleContact, updatedContactData);

      // Save the updated contact
      const updatedContact = await singleContact.save();

      return apiResponse.success(res, 200, {
        message: "Contact updated successfully",
        contact: updatedContact,
      });
    } catch (err) {
      return apiResponse.handleDuplicateKeyError(res, err);
    }
  },
};
