import { Response } from "express";

type Props = {
  res: Response;
  status?: number;
  message: string;
  data?: any;
  error?: any;
};

export const sendResponse = ({ res, status = 200, message, data, error }: Props) => {
  const success = status < 400;

  if (error) {
    console.error("Error:", error);
  }

 res.status(status).json({
    message,
    data,
    success,
    status,
  });
};
