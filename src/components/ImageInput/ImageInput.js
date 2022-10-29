import React from "react";
//Firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
// //Image
import check from "../../images/check.png";
// //MUI
// import Button from "@mui/material/Button";
// // import IconButton from "@mui/material/IconButton";
// // import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";

function ImageInput({ name, label, value, type, handleInputState, ...rest }) {
  const inputRef = React.useRef();
  const [progress, setProgress] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);

  const handleUpload = () => {
    setShowProgress(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(
        storage,
        type === "image" ? `/images/${fileName}` : ""
    );
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const uploaded = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                handleInputState(name, url);
            });
        }
    );
};

  return (
    <div className="img-input-container">
        <button
            onClick={() => inputRef.current.click()}
        >   {label}
        </button>
        <input 
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
            {...rest}
        />
        {type === "image" && value && (
        <img
          src={typeof value === "string" ? value : URL.createObjectURL(value)}
          alt="file"
          className="preview-img"
        />
      )}
      {value !== null && !showProgress && typeof value !== "string" && (
        <button onClick={handleUpload}>
          Upload
        </button>
      )}
      {showProgress && progress < 100 && (
        <div className="progress-container">
          <p>{progress}%</p>
        </div>
      )}
      {progress === 100 && (
        <div className="progress-container">
          <img src={check} alt="check circle" className="check-img" />
        </div>
      )}
    </div>
    // <Stack direction="row" alignItems="center" spacing={2}>
    //   <Button
    //     variant="contained"
    //     component="label"
    //     onClick={() => inputRef.current.click()}
    //   >
    //     {label}
    //     <input
    //       multiple
    //       ref={inputRef}
    //       type={type}
    //       name={name}
    //       value={value}
    //       onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
    //       {...rest}
    //     />
    //   </Button>
    //   {type === "image" && value && (
    //     <img
    //       src={typeof value === "string" ? value : URL.createObjectURL(value)}
    //       alt="file"
    //       className="preview-img"
    //     />
    //   )}
    //   {value !== null && !showProgress && typeof value !== "string" && (
    //     <button onClick={handleUpload}>
    //       Upload
    //     </button>
    //   )}
    //   {showProgress && progress < 100 && (
    //     <div className="progress-container">
    //       <p>{progress}%</p>
    //     </div>
    //   )}
    //   {progress === 100 && (
    //     <div className="progress-container">
    //       <img src={check} alt="check circle" className="check-img" />
    //     </div>
    //   )}
    //   {/* <IconButton
    //                 color="primary"
    //                 aria-label="upload profile picture"
    //                 component="label"
    //               >
    //                 <input
    //                   accept="image/*"
    //                   multiple
    //                   ref={inputRef}
    //                   type={type}
    //                   name={name}
    //                   value={value}
    //                   onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
    //                 />
    //                 <PhotoCamera />
    //               </IconButton> */}
    // </Stack>
  );
}

export default ImageInput;
