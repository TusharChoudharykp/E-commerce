const Joi = require("joi");

// Schema for adding a product to the cart
const addToCartSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  product_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

// Schema for updating cart item quantity
const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

// Middleware function to validate request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = {
  addToCartSchema,
  updateCartItemSchema,
  validateRequest,
};
