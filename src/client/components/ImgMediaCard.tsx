import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
  movieName: string;
}

export default function ImgMediaCard({movieName} : Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://flxt.tmsimg.com/assets/p31912_p_v12_ao.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movieName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sick ass bad ass movie.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
