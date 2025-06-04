import { Switch, FormControlLabel } from "@mui/material";
import useFromStore from "../../store/form";

function UseNonEquilibriumCalculationsSwitch() {
  const { isNonEquilibrium, toggleIsNonEquilibrium } = useFromStore(); //zustand

  return (
    <FormControlLabel
      control={
        <Switch
          data-testid="non-equilibrium-switch-testid"
          checked={isNonEquilibrium}
          onChange={(event) => toggleIsNonEquilibrium(event.target.checked)}
        />}
      label="Use non-equilibrium calculations"
    />
  );
}

export default UseNonEquilibriumCalculationsSwitch;
