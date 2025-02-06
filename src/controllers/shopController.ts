import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import { Vehicle } from "../models/VehicleModel";

export const createNewVehicle = (req: Request, res: Response) => {
  try {
    const { merk, model, bouwjaar, prijs, type, cilinderinhoud } = req.body;

    const newVehicle = new Vehicle({
      merk,
      model,
      bouwjaar,
      prijs,
      type,
      cilinderinhoud,
    });

    newVehicle.save();
    if (newVehicle) {
      res.status(201).json({ message: "Vehicle created successfully" });
    } else {
      res.status(500).json({ message: "Error creating vehicle" });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error creating vehicle", error });
    }
  }
};

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findById(id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle", error });
  }
};

export const updateVechicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { merk, model, bouwjaar, prijs, type, cilinderinhoud } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { merk, model, bouwjaar, prijs, type, cilinderinhoud },
      { new: true }
    );

    if (updatedVehicle) {
      res.status(200).json(updatedVehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle", error });
  }
};

export const deleteVechicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (deletedVehicle) {
      res.status(200).json({ message: "Vehicle deleted successfully" });
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error });
  }
};

export const searchVehiclesByBrandOrYear = async (
  req: Request,
  res: Response
) => {
  try {
    const { merk, bouwjaar } = req.query;

    let filter: any = {};

    if (merk) {
      filter.merk = { $regex: merk, $options: "i" };
    }

    if (bouwjaar && !isNaN(Number(bouwjaar))) {
      filter.bouwjaar = Number(bouwjaar);
    }

    const vehicles = await Vehicle.find(filter);

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error searching vehicles", error });
  }
};

export const getVehiclesWithPagination = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 3 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const vehicles = await Vehicle.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};


export const getVehicleWithPriceRangeFilter = async (req: Request, res: Response) => {
  try {
    const { min, max } = req.query;
    const vehicles = await Vehicle.find({
      price: { $gte: min, $lte: max },
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
}