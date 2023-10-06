import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Box } from "@mui/material";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
const VideoPage = ({ urlKey, show, setUrl }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      sx={{
        width: "100%",
        "& .MuiPaper-root ": {
          minWidth: "700px",
          height: "500px",
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
