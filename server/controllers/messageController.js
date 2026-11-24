import Message from '../models/Message.js';

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private (Admin)
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a new contact message
// @route   POST /api/messages
// @access  Public
export const createMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been delivered to Wasi Ullah successfully.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read/unread
// @route   PUT /api/messages/:id/read
// @access  Private (Admin)
export const markMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    message.isRead = isRead !== undefined ? isRead : true;
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message status updated',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

