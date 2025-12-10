import catchAsync from "../../../utils/catchAsync.js";
import Teammate from "../model/teammateModel.js";

export const getTeammates = catchAsync(async (res) => {
  const teammates = await Teammate.find();

  res.status(200).json({
    success: true,
    message: "Teammates retrieved successfully",
    data: {
      teammates,
    },
  });
});

export const getTeammate = catchAsync(async (req, res) => {
  const teammate = await Teammate.findById(req.user);

  res.status(200).json({
    success: true,
    message: "Teammate retrieved successfully",
    data: {
      teammate,
    },
  });
});

export const createTeammate = catchAsync(async (req, res) => {
  try {
    const { name } = req.body;

    const newTeammate = new Teammate({
      name,
    });
    await newTeammate.save();

    res.status(201).json({
      success: true,
      message: "Teammate created successfully",
      data: {
        teammate: newTeammate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create teammate",
      error: error.message,
    });
  }
});

export const updateTeammate = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const teammate = await Teammate.findById(id);

    if (!teammate) {
      return res.status(404).json({
        success: false,
        message: "Teammate not found",
      });
    }

    const { name } = req.body;

    teammate.name = name || teammate.name;
    teammate.updatedAt = Date.now();

    await teammate.save();

    res.status(200).json({
      success: true,
      message: "Teammate updated successfully",
      data: {
        teammate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update teammate",
      error: error.message,
    });
  }
});

export const deleteTeammate = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const teammate = await Teammate.findByIdAndDelete(id);

    if (!teammate) {
      return res.status(404).json({
        success: false,
        message: "Teammate not found",
      });
    }

    await Teammate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Teammate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete teammate",
      error: error.message,
    });
  }
});
