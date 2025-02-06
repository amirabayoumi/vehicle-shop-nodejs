import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  createNewVehicle,
  updateVechicle,
  deleteVechicle,
  searchVehiclesByBrandOrYear,
  getVehiclesWithPagination,
  getVehicleWithPriceRangeFilter,
} from "../controllers/shopController";

const router = express.Router();

router
  .post("/", createNewVehicle)
  .get("/", getAllVehicles, getVehiclesWithPagination, getVehicleWithPriceRangeFilter, searchVehiclesByBrandOrYear)
  .get("/:id", getVehicleById)
  .put("/:id", updateVechicle)
  .delete("/:id", deleteVechicle)




export default router;
