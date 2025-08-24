import {
  Typography
} from "@mui/material";

interface HeaderProps {text:string}

const Header = ({text}:HeaderProps) => {
  return (
    <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 600,
          letterSpacing: "-0.02em",
          mb: 4,
          background: "linear-gradient(90deg, #000, #444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </Typography>
  )
}

export default Header
