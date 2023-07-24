import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

import { useHandleErrorResponse } from "../hooks/fetching";
import {
  useCreateRecord,
  useGetAllOperationsRequest,
} from "../../global/hooks/request";
import { Alert } from "../../global/components/Alert";

export const OperationsPage = () => {
  const { handleErrorResponse } = useHandleErrorResponse();
  const { operations } = useGetAllOperationsRequest(handleErrorResponse);

  const {
    createRecord,
    record,
    createRecordResponseStatus,
    createRecordLoading,
  } = useCreateRecord((error) => {
    try {
      handleErrorResponse(error);
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  });
  const [selectedOperation, setSelectedOperation] = useState("");
  const [operationForm, setOperationForm] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOperationChange = (event) => {
    const selectedOperationId = event.target.value;
    const selectedOperationData = operations.find(
      (op) => op._id === selectedOperationId
    );
    setSelectedOperation(selectedOperationData);
    setOperationForm({}); // Clear the form when the operation is changed
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setOperationForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setOpen(false);

    createRecord({
      operation_id: selectedOperation._id,
      date: new Date(),
      ...operationForm,
    });
  };

  const requireFirstInput =
    selectedOperation.type === "addition" ||
    selectedOperation.type === "subtraction" ||
    selectedOperation.type === "multiplication" ||
    selectedOperation.type === "division" ||
    selectedOperation.type === "square root";

  const requireSecondInput =
    selectedOperation.type === "addition" ||
    selectedOperation.type === "subtraction" ||
    selectedOperation.type === "multiplication" ||
    selectedOperation.type === "division";

  useEffect(() => {
    if (!createRecordLoading && createRecordResponseStatus === 201) {
      setOpen(true);
      setMessage(`The response is: ${record.operation_response}`);
    }
  }, [createRecordResponseStatus, record, createRecordLoading]);

  return (
    <>
      <Alert
        message={message}
        severity="success"
        open={open}
        onClose={() => setOpen(false)}
      />

      <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Operations Page
          </Typography>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Select an operation</InputLabel>
            <Select
              value={selectedOperation._id || ""}
              onChange={handleOperationChange}
              label="Select an operation"
            >
              {operations.map((op) => (
                <MenuItem key={op._id} value={op._id}>
                  {op.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedOperation.type && (
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {requireFirstInput && (
                <TextField
                  type="number"
                  name="operand1"
                  label="Operand 1"
                  variant="outlined"
                  margin="normal"
                  value={operationForm.operand1 || ""}
                  onChange={handleFormInputChange}
                  required
                  fullWidth
                />
              )}
              {requireSecondInput && (
                <TextField
                  type="number"
                  name="operand2"
                  label="Operand 2"
                  variant="outlined"
                  margin="normal"
                  value={operationForm.operand2 || ""}
                  onChange={handleFormInputChange}
                  required
                  fullWidth
                />
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "16px" }}
              >
                Submit
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </>
  );
};
