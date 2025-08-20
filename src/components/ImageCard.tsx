import {
  Card,
  CardMedia,
  Grid,
  GridProps,
} from "@mui/material";

  interface ImageCardProps {
    onClick: () => void;
    url: string;
  }

  const ImageCard = ({ onClick, url }: ImageCardProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} component="div" {...({ item: true } as GridProps)}>
        <Card
          onClick={onClick}
          sx={{
            cursor: "pointer",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="500"
            image={url}
            alt={url}
            sx={{ objectFit: "cover" }}
          />
        </Card>
      </Grid>
    );
  };

  export default ImageCard;
