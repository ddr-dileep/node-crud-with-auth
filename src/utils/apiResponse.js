export const apiResponse = {
  success: (res, status = 200, data) => {
    return res.status(status).json({
      success: true,
      data: data,
    });
  },

  error: (res, status = 400, data) => {
    return res.status(status).json({
      success: false,
      message: data?.message,
    });
  },

  serverError: (res, status = 500) => {
    return res.status(status).json({
      success: false,
      message: "Something went wrong",
    });
  },

  handleDuplicateKeyError: (res, error) => {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const fieldName = Object.keys(error.keyPattern)[0];
      const duplicatedValue = error.keyValue[fieldName];
      return res.status(400).json({
        success: false,
        message: `${fieldName} '${duplicatedValue}' is already in use.`,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong" });
    }
  },
};
