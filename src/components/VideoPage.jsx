import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import YouTube from "react-youtube";
const VideoPage = ({ urlKey, show, setUrl }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      sx={{
        width: "100%",
        "& .MuiPaper-root ": {
          minWidth: {
            xs: "100%",
            md: "700px",
          },
          height: {
            xs: "300px",
            md: "500px",
          },
        },
      }}
      fullScreen={fullScreen}
      open={show}
      aria-labelledby="responsive-dialog-title"
    >
      {/* <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
        
      </DialogTitle> */}
      <DialogContent
        sx={{
          padding: 0,
          overflow: "hidden",
          "& div, iframe ": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <YouTube videoId={urlKey} />
      </DialogContent>

      <DialogActions sx={{ bgcolor: "black" }}>
        <Button
          autoFocus
          onClick={() => {
            setUrl((prev) => {
              return {
                ...prev,
                show: false,
              };
            });
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoPage;
