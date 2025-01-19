import React from "react";
import { Car } from "../utils/types";
import { DialogContent, Stack, TextField } from "@mui/material";

type Props = {
  car: Car;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CarDialogContent = ({ car, handleChange }: Props) => {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField
          placeholder="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
        />

        <TextField
          placeholder="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
        />

        <TextField
          placeholder="Colour"
          name="colour"
          value={car.colour}
          onChange={handleChange}
        />

        <TextField
          placeholder="Year"
          name="modelYear"
          value={car.modelYear}
          onChange={handleChange}
        />

        <TextField
          placeholder="Reg No."
          name="registrationNumber"
          value={car.registrationNumber}
          onChange={handleChange}
        />

        <TextField
          placeholder="Price"
          name="price"
          value={car.price}
          onChange={handleChange}
        />
      </Stack>
    </DialogContent>
  );
};

export default CarDialogContent;
