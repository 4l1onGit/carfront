import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateCar } from "../api/carapi";
import { Car, CarEntry, CarResponse } from "../utils/types";
import CarDialogContent from "./CarDialogContent";
import Tooltip from "@mui/material/Tooltip";

type FormProps = {
  cardata: CarResponse;
};

const EditCar = ({ cardata }: FormProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    colour: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  const handleClickOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      colour: cardata.colour,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntry: CarEntry = { car, url };
    mutate(carEntry);
    setCar({
      brand: "",
      model: "",
      colour: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <Tooltip title="Edit Car">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditCar;
