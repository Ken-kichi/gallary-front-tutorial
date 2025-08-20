import { Box } from "@mui/material";
import { ReactNode } from "react";

// インターフェースを修正してcontentの型を明示
interface WrapperProps {
    children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#fff",
        minHeight: "100vh",
        fontFamily: "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
