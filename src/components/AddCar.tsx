import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addCar } from "../api/carapi";
import { Car } from "../utils/types";
import CarDialogContent from "./CarDialogContent";

const AddCar = () => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    colour: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    mutate(car);
    setCar({
      brand: "",
      model: "",
      colour: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCar;
